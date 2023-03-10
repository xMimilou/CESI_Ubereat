const express = require('express');
const router = express.Router();
const pool = require('../helpers/database.js')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var referralCodes = require("referral-codes")



/* ----------------------- */
/* ---- GET REQUESTS ----- */
/* ----------------------- */




/* use one time */
router.get('/user', async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // retrieve the userid from the token
        const decoded = jwt.verify(token, 'secret');

        // return user from database

        const sqlQuery = `SELECT * FROM user WHERE iduser = ?`;
        var result = await pool.query(sqlQuery, [decoded._id]);
        // change date format for created_at and updated_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
        var date = new Date(result[0].created_at);
        result[0].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        var date = new Date(result[0].updated_at);
        result[0].updated_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

        res.status(200).json(result);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});


/* ----------------------- */

router.get("/tokenCheckup", async(req, res) => {
    try{
        // check jwt token
        
        const token = req.header('auth-token');
        //console.log(token);

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        res.status(200).json({message: "Access granted"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

/* ----------------------- */

router.get("/all", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // return all user from database

        const sqlQuery = `SELECT * FROM user`;
        const result = await pool.query(sqlQuery);
        res.status(200).json(result);

    } catch(err){
        res.status(400).json({message: err.message});
    }
});

/* ----------------------- */


router.get("/user", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // retrieve the userid from the token
        const decoded = jwt.verify(token, 'secret');

        // return user from database

        const sqlQuery = `SELECT * FROM user WHERE iduser = ?`;
        var result = await pool.query(sqlQuery, [decoded._id]);
        // change date format for created_at and updated_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
        var date = new Date(result[0].created_at);
        result[0].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        var date = new Date(result[0].updated_at);
        result[0].updated_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
 
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({message: err.message});
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
  

/* ----------------------- */
/* ---- POST REQUESTS ---- */
/* ----------------------- */

/* use one time to create the user table in the database */
router.post('/register', async (req, res) => {
    try{
        const { first_name, last_name, username, password, email, referal_by, role } = req.body;
        
        // check for fields required 
        if (!first_name || !last_name || !email || !password || !username || !role) {
            return res.status(400).send({ error: 'Fields are required.' });
        }

        // generate a unique referal number
        var referal_code = referralCodes.generate({
            pattern: '#####-##-###'
        });

        // get first element of the array
        referal_code = referal_code[0];
        
        // check if the user already exists
        const checkUser = `SELECT * FROM user WHERE username = ?`;
        const checkUserResult = await pool.query(checkUser, [username])
        if(checkUserResult.length > 0){
            return res.status(400).json({message: "User already exists"});
        }

        // check if referal_by exists
        const checkReferal = `SELECT * FROM user WHERE referal_code = ?`;
        const checkReferalResult = await pool.query(checkReferal, [referal_by])
        if(checkReferalResult.length == 0){
            return res.status(400).json({message: "Referal code doesn't exist"});
        }
        

        // get actual datetime in format YYYY-MM-DD HH:MM:SS
        const date = new Date();

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // insert the user
        const sqlQuery = `INSERT INTO user (first_name, last_name, username, password, email, referal_by, referal_code, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await pool.query(sqlQuery, [first_name, last_name, username, hashedPassword, email, referal_by, referal_code, role, date, date]);
        res.status(200).json({message: "User created successfully"});

    } catch(err){
        res.status(400).json({message: err.message});
    }
});

/* use 1 time */
router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;

        // check if the user exists
        const checkUser = `SELECT * FROM user WHERE username = ?`;
        const checkUserResult = await pool.query(checkUser, [username]);
        if(checkUserResult.length == 0){
            return res.status(400).json({message: "User does not exist"});
        }

        // check if the password is correct
        const validPassword = await bcrypt.compare(password, checkUserResult[0].password);
        if (!validPassword) return res.status(400).json({message: "Invalid password"});

        // create and assign a token to the user with expiration of 2h
        const token = jwt.sign({ _id: checkUserResult[0].iduser }, 'secret', { expiresIn: '2h' });

        // give redirect address depending on the role
        if(checkUserResult[0].role == "commercial"){
            res.header('auth-token', token).json({token: token, username: username, role: checkUserResult[0].role, redirect: ":8000"});
        } else if(checkUserResult[0].role == "client"){
            res.header('auth-token', token).json({token: token, username: username, role: checkUserResult[0].role, redirect: ":8001"});
        } else if(checkUserResult[0].role == "livreur"){
            res.header('auth-token', token).json({token: token, username: username, role: checkUserResult[0].role, redirect: ":8002"});
        } else if(checkUserResult[0].role == "restaurateur"){
            res.header('auth-token', token).json({token: token, username: username, role: checkUserResult[0].role, redirect: ":8003"});
        } else {
            res.header('auth-token', token).json({token: token, username: username, role: checkUserResult[0].role, redirect: ":8003"});
        }


    } catch(err){
        res.status(500).json({message: err.message});
    }
});

/* ----------------------- */
/* ---- PUT REQUESTS ----- */
/* ----------------------- */

/* use 1 time : update user */
router.put("/update", async (req, res) => {
    try{

        var { first_name, last_name, email  } = req.body;

        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // retrieve user id from token
        var decoded = parseInt(jwt.verify(token, 'secret')._id);
        //console.log(decoded);
        //console.log(first_name);
        //console.log(last_name);
        //console.log(email);

        // get actual datetime in format YYYY-MM-DD HH:MM:SS
        var date = new Date();
        var updated_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        
        // update user
        const sqlQuery = `UPDATE user SET first_name = ?, last_name = ?, email = ?, updated_at = ? WHERE iduser = ?`;
        const result = await pool.query(sqlQuery, [first_name, last_name, email, updated_at, decoded]);
        res.status(200).json({message: "User updated successfully"});

    } catch(err){
        res.status(400).json({message: err.message});
    }
});

/* ----------------------- */

router.put('/resetpassword', async (req, res) => {
    try{
        const { last_password, new_password } = req.body;

        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // check if the user exists
        const checkUser = `SELECT * FROM user WHERE iduser = ?`;
        const checkUserResult = await pool.query(checkUser, [req.user.id]);
        if(checkUserResult.length == 0){
            return res.status(400).json({message: "User does not exist"});
        }

        // check if the password is correct
        const validPassword = await bcrypt.compare(last_password, checkUserResult[0].password);
        if (!validPassword) return res.status(400).json({message: "Invalid password"});

        // get actual datetime in format YYYY-MM-DD HH:MM:SS
        const date = new Date();

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(new_password, salt)

        // update user password
        const sqlQuery = `UPDATE user SET password = ?, updated_at = ? WHERE iduser = ?`;
        const result = await pool.query(sqlQuery, [hashedPassword, date, req.user.id]);
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

/* ----------------------- */
/* ---- DELETE REQUESTS -- */
/* ----------------------- */

router.delete("/delete", async (req, res) => {
    try{
        
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // retrieve the userid from the token
        var decodedID = parseInt(jwt.verify(token, 'secret')._id);

        // delete user
        const sqlQuery = `DELETE FROM user WHERE iduser = ?`;
        const result = await pool.query(sqlQuery, [decodedID]);
        res.status(200).json({message: "User deleted successfully"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;