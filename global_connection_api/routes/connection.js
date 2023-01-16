const express = require('express');
const router = express.Router();
const pool = require('../helpers/database.js')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var referralCodes = require("referral-codes")

// const mongodb = require('mongodb');

router.get('user/:id', async function(req, res) {

    try{
        const sqlQuery = `SELECT * FROM user WHERE iduser = ?`;
        const result = await pool.query(sqlQuery, [req.params.id]);
        res.status(200).json(result);

    }catch(err){
        res.status(400).json({message: err.message});
    }

    
});

router.post('/register', async (req, res) => {
    try{
        const { first_name, last_name, username, password, email, referal_by, role } = req.body;
        
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

        res.header('auth-token', token).json({token: token, username: username, role: checkUserResult[0].role});

    } catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post("/tokenCheckup", async(req, res) => {
    try{
        // check jwt token
        
        const token = req.header('auth-token');
        console.log(token);

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        console.log("Access granted");
        res.status(200).json({message: "Access granted"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

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
        console.log(decoded);
        console.log(first_name);
        console.log(last_name);
        console.log(email);

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
        

router.post("/delete", async (req, res) => {
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






// router.post('/register', async (req, res) => {
//   if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
//     return res.status(400).send({ error: 'All fields are required.' });
//   }

//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(req.body.password, salt)

//   const user = new User({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     password: hashedPassword,
//   })

//   const result = await user.save()

//   const { password, ...data } = await result.toJSON()

//   res.send(data);
// })

// router.post('/login', async (req, res) => {
//   const user = await User.findOne({ email: req.body.email })
//   if (!user) {
//     return res.status(404).send({
//       message: "user not found"
//     })
//   }

//   if (!await bcrypt.compare(req.body.password, user.password)) {
//     return res.status(400).send({
//       message: "invalid credentials"
//     })
//   }

//   const token = jwt.sign({ _id: user._id }, "secret")

//   res.cookie('jwt', token, {
//     httpOnly: false,
//     maxAge: 24 * 60 * 60 * 1000 // 1 day
//   })

//   res.send({
//     message: 'success',
//     token: token,
//     first_name: user.first_name,
//     last_name: user.last_name
//   });
// })

// router.get('/user', async (req, res) => {
//   try {
//     const cookie = req.headers.authorization.split(' ')[1];
//     const claims = jwt.verify(cookie, 'secret')

//     if (!claims) {
//       return res.status(401).send({
//         message: "unauthenticated"
//       })
//     }

//     const user = await User.findOne({ _id: claims._id })

//     const { password, ...data } = await user.toJSON()

//     res.send(data)
//   } catch (e) {
//     return res.status(401).send({
//       message: "unauthenticated"
//     })
//   }
// })

// router.post('/logout', (req, res) => {
//   res.cookie('jwt', '', { maxAge: 0 })

//   res.send({
//     message: 'success'
//   })
// })

// router.post('/delete_account', async (req, res) => {
//   try {
//     // First, get the password from the request body
//     const password = req.body.password;

//     // Then, get the JWT from the request headers
//     const token = req.body.token
//     const claims = jwt.verify(token, 'secret');
//     console.log("log1: " + token);
//     console.log("log2: " + claims._id)
//     if (!claims) {
//       return res.status(401).send({
//         message: 'unauthenticated2'
//       });
//     }
//     // Find the user with the matching ID and password
//     const _id = mongodb.ObjectId(claims._id);

//     const user = await User.findOne({ _id })

//     if (user && await bcrypt.compare(user.password, password)) {
//       // If no user was found, send a response with a status code of 401 (Unauthorized)
//       return res.status(401).send({
//         message: 'incorrect password'
//       });
//     }

//     // If the user was found, delete the user document from the collection
//     await User.deleteOne({ _id: claims._id });

//     // Send a response with a status code of 200 (OK)
//     res.sendStatus(200);
//   } catch (error) {
//     return res.status(401).send({
//       message: 'unauthenticated3'
//     });
//   }
// });

// router.post('/edit_account', async (req, res) => {
//   try {
//     // First, get the password from the request body

//     const first_name = req.body.first_name;
//     const last_name = req.body.last_name;
//     const email = req.body.email;
//     const password = req.body.password;
//     const token = req.body.token

//     const claims = jwt.verify(token, 'secret');
//     if (!claims) {
//       return res.status(401).send({
//         message: 'unauthenticated1'
//       });
//     }
//     // Find the user with the matching ID and password
//     const _id = mongodb.ObjectId(claims._id);
//     const user = await User.findOne({ _id })

//     if (!user) {
//       // If no user was found, send a response with a status code of 401 (Unauthorized)
//       return res.status(401).send({
//         message: 'incorrect password'
//       });
//     }

//     // If the user was found, change the first_name, last_name and email if there are different 
//     if (user.first_name !== first_name) {
//       user.first_name = first_name;
//     }
//     if (user.last_name !== last_name) {
//       user.last_name = last_name;
//     }
//     if (user.email !== email) {
//       user.email = email;
//     }
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)
//     if (user.password !== hashedPassword) {
//       user.password = hashedPassword;
//     }

//     // Save the updated user
//     await user.save();

//     // Send a response with a status code of 200 (OK)
//     res.sendStatus(200);
//   } catch (error) {
//     return res.status(401).send({
//       message: 'unauthenticated2'
//     });
//   }
// });

module.exports = router;