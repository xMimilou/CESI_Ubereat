const express = require('express');
const router = express.Router();
const pool = require('../helpers/database.js')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


router.post("/total/client", async (req, res) => {
    try{
        const sqlQuery = `SELECT COUNT(*) AS total FROM user WHERE role = 'client'`;
        const result = await pool.query
        (sqlQuery);
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({message: err.message});
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

router.put("/update/:id", async (req, res) => {
    try{

        const { first_name, last_name, username, email  } = req.body;

        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // get actual datetime in format YYYY-MM-DD HH:MM:SS
        const date = new Date();


        // update user
        const sqlQuery = `UPDATE user SET first_name = ?, last_name = ?, username = ?, email = ?, updated_at = ? WHERE iduser = ?`;
        const result = await pool.query(sqlQuery, [first_name, last_name, username, email, date, req.params.id]);
        res.status(200).json(result);

    } catch(err){
        res.status(400).json({message: err.message});
    }
});

router.delete("/delete/:id", async (req, res) => {
    try{
        
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // delete user
        const sqlQuery = `DELETE FROM user WHERE iduser = ?`;
        const result = await pool.query(sqlQuery, [req.params.id]);
        res.status(200).json(result);
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






module.exports = router;