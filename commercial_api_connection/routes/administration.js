const express = require('express');
const router = express.Router();
const pool = require('../helpers/database.js')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


router.post("/list/clients", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        const sqlQuery = 'SELECT iduser,last_name,first_name,username,email,role,created_at FROM `user` WHERE role = "client" LIMIT 5';
        const result = await pool.query
        (sqlQuery);
        //console.log(result[0]);
        var query_result = result;
        
        
        for (var i = 0; i < query_result.length; i++) {
            var date = new Date(query_result[i].created_at);
            // change date in created_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
            query_result[i].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }
        res.status(200).json(query_result);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/list/restaurateur", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        const sqlQuery = 'SELECT iduser,last_name,first_name,username,email,role,created_at FROM `user` WHERE role = "restaurateur" LIMIT 5';
        const result = await pool.query
        (sqlQuery);
        //console.log(result[0]);
        var query_result = result;
        
        
        for (var i = 0; i < query_result.length; i++) {
            var date = new Date(query_result[i].created_at);
            // change date in created_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
            query_result[i].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }
        res.status(200).json(query_result);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/list/livreur", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        const sqlQuery = 'SELECT iduser,last_name,first_name,username,email,role,created_at FROM `user` WHERE role = "livreur" LIMIT 5';
        const result = await pool.query
        (sqlQuery);
        //console.log(result[0]);
        var query_result = result;
        
        
        for (var i = 0; i < query_result.length; i++) {
            var date = new Date(query_result[i].created_at);
            // change date in created_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
            query_result[i].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }
        res.status(200).json(query_result);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});





module.exports = router;