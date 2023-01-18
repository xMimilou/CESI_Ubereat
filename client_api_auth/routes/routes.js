const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const pool = require('../helpers/database.js');
const referralCodes = require("referral-codes");
require('dotenv').config()


router.get('/user', async (req, res) => {
  try {
    const token = req.header('auth-token');
    // check if the token is valid
    if (!token) return res.status(401).json({ message: "Access denied" });

    const user_id = jwt.verify(token, 'secret', (err, decoded) => {
      if (err) return res.status(401).json({ message: "Access denied" });
    });

    const checkQuery = `SELECT * FROM user WHERE iduser = ?`;
    const user = await pool.query(checkQuery, [user_id]);

    const { password, ...data } = await user.toJSON()

    res.send(data)
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated"
    })
  }
})

router.post("/tokenCheckup", async (req, res) => {
  try {
    // check jwt token

    const token = req.header('auth-token');
    console.log(token);

    // check if the token is valid
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) return res.status(401).json({ message: "Access denied" });
    });
    console.log("Access granted");
    res.status(200).json({ message: "Access granted" });
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/register', async (req, res) => {

  try {
    const { first_name, last_name, username, password, email, referal_by, role } = req.body;

    // check for fields required 
    if (!first_name || !last_name || !email || !password || !username || !role) {
      return res.status(400).send({ error: 'Fields are required.' });
    }

    // generate a unique referal number
    let referal_code = referralCodes.generate({
      pattern: '#####-##-###'
    });

    // get first element of the array
    referal_code = referal_code[0];

    // check if the user already exists
    const checkUser = `SELECT * FROM user WHERE username = ?`;
    const checkUserResult = await pool.query(checkUser, [username])
    if (checkUserResult.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // get actual datetime in format YYYY-MM-DD HH:MM:SS
    const date = new Date();

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // insert the user
    const sqlQuery = `INSERT INTO user (first_name, last_name, username,
       password, email, referal_by, referal_code, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await pool.query(sqlQuery, [first_name, last_name, username, hashedPassword, email, referal_by, referal_code, role, date, date]);
    res.status(200).json({ message: "User created successfully" });

  } catch (error) {
    return res.status(401).send({
      message: 'Sign up failed'
    });
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if the user exists
    const checkUser = `SELECT * FROM user WHERE username = ?`;
    const checkUserResult = await pool.query(checkUser, [username]);
    if (checkUserResult.length == 0) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // check if the password is correct
    const validPassword = await bcrypt.compare(password, checkUserResult[0].password);
    if (!validPassword) return res.status(400).json({ message: "Invalid password" });

    // create and assign a token
    const token = jwt.sign({ id: checkUserResult[0].iduser }, process.env.SECRET, { expiresIn: '2h' });

    res.header('auth-token', token).json({ token: token, username: username, role: checkUserResult[0].role, referal_code: checkUserResult[0].referal_code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

router.post('/delete', async (req, res) => {

  try {
    const token = req.header('auth-token');
    const password = req.body.password;

    // check if the token is valid
    if (!token) return res.status(401).json({ message: "Access denied" });

    const user_id = jwt.verify(token, process.env.SECRET);

    const checkQuery = `SELECT password FROM user WHERE iduser = ?`;
    const pass = await pool.query(checkQuery, [user_id.id]);

    if (await bcrypt.compare(password, pass[0].password) != true) {
      // If no user was found, send a response with a status code of 401 (Unauthorized)
      return res.status(401).send({
        message: 'incorrect password'
      });
    }
    // delete user
    const deleteQuery = `DELETE FROM user WHERE iduser = ?`;
    const result = await pool.query(deleteQuery, [user_id.id]);

    res.status(200).json({ message: "success !" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { first_name, last_name, username, email } = req.body;

    const token = req.header('auth-token');
    // check if the token is valid
    if (!token) return res.status(401).json({ message: "Access denied" });

    const user_id = jwt.verify(token, 'secret');

    // get actual datetime in format YYYY-MM-DD HH:MM:SS
    const date = new Date();

    // update user
    const sqlQuery = `UPDATE user SET first_name = ?, last_name = ?, username = ?, email = ?, updated_at = ? WHERE iduser = ?`;
    const result = await pool.query(sqlQuery, [first_name, last_name, username, email, date, user_id.id]);
    res.status(200).json({ message: "success !" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/referal', async (req, res) => {
  try {

    const token = req.header('auth-token');
    // check if the token is valid
    if (!token) return res.status(401).json({ message: "Access denied" });

    const user_id = jwt.verify(token, process.env.SECRET);

    const checkQuery = `SELECT COUNT(*) as count FROM user WHERE referal_code = (SELECT referal_by FROM user WHERE iduser = ?)`;
    const result = await pool.query(checkQuery, [user_id.id]);

    if (result[0].count > 0) {
      return res.status(200).json({ message: "Referal code is valid", valid: true });
    } else {
      return res.status(200).json({ message: "Referal code is not valid", valid: false });
    }

  } catch (err) {
    res.status(400).json({ message: err.message });
  }

});

module.exports = router;