const express = require('express');
const router = express.Router();
const pool = require('../helpers/database.js')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


router.post("/total/client", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        const sqlQuery = `SELECT COUNT(*) AS total FROM user WHERE role = 'client'`;
        const result = await pool.query
        (sqlQuery);
        // convert value for example 4n into 4
        var str = result[0].total;
        var total = parseInt(str)
        res.status(200).json(total);


    } catch(err){
        res.status(400).json({message: err.message});
    }   
});

router.post("/total/restaurateur", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        const sqlQuery = `SELECT COUNT(*) AS total FROM user WHERE role = 'restaurateur'`;
        const result = await pool.query
        (sqlQuery);
        // convert value for example 4n into 4
        var str = result[0].total;
        var total = parseInt(str)
        res.status(200).json(total);


    } catch(err){
        res.status(400).json({message: err.message});
    }   
});

router.post("/total/livreur", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        const sqlQuery = `SELECT COUNT(*) AS total FROM user WHERE role = 'livreur'`;
        const result = await pool.query
        (sqlQuery);
        // convert value for example 4n into 4
        var str = result[0].total;
        var total = parseInt(str)
        res.status(200).json(total);


    } catch(err){
        res.status(400).json({message: err.message});
    }   
});


router.post("/total/users", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        const sqlQuery = `SELECT COUNT(*) AS total FROM user`;
        const result = await pool.query
        (sqlQuery);
        // convert value for example 4n into 4
        var str = result[0].total;
        var total = parseInt(str)
        res.status(200).json(total);


    } catch(err){
        res.status(400).json({message: err.message});
    }   
});


router.post("/list/lastuser", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        const sqlQuery = 'SELECT last_name,first_name,username,email,role,created_at FROM `user` ORDER BY created_at DESC LIMIT 5';
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


router.post("/new/users", async(req, res) => {
    try{
        
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        
        const sqlQuery = 'SELECT * FROM user';
        const result = await pool.query
        (sqlQuery);

        var query_result = result;
        // get date of today in format YYYY/MM/DD
        var date = new Date();
        var today = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
        var count = 0
        // for each user in the database we check if the user is new or not
        for (var i = 0; i < query_result.length; i++) {
            var date = new Date(query_result[i].created_at);
            // change date in created_at into format YYYY/MM/DD containing 0 for exemple janvier = 01
            query_result[i].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
            
            // check if the user is new or not
            if(query_result[i].created_at == today){
                count = count + 1;
            }else{
                count = count;
            }
        }


        res.status(200).json(count);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});


router.post("/list/highest", async(req, res) => {
    try{
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/get/client/:page", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        
        // get page number 
        const page = req.params.page;

        // get the number of client per page
        const limit = 20;

        // get the offset
        const offset = (page - 1) * limit;

        // get the total number of client
        const sqlQuery = 'SELECT COUNT(*) AS total FROM user WHERE role = "client"';
        var result = await pool.query (sqlQuery);
        
        result = result[0].total;
        result = parseInt(result);

        // get the total number of page
        const pages = Math.ceil(result / limit);

        // query to get the client
        const sqlQuery2 = 'SELECT * FROM user WHERE role = "client" LIMIT ' + limit + ' OFFSET ' + offset;
        var result2 = await pool.query (sqlQuery2);

        // change date format for created_at and updated_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
        for (var i = 0; i < result2.length; i++) {
            var date = new Date(result2[i].created_at);
            result2[i].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
            var date = new Date(result2[i].updated_at);
            result2[i].updated_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }

        // send + pages number
        res.status(200).json({result2, pages});


    }catch(err){
        res.status(400).json({message: err.message});
    }
});


router.post("/get/restaurateur/:page", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        
        // get page number 
        const page = req.params.page;

        // get the number of client per page
        const limit = 20;

        // get the offset
        const offset = (page - 1) * limit;

        // get the total number of client
        const sqlQuery = 'SELECT COUNT(*) AS total FROM user WHERE role = "restaurateur"';
        var result = await pool.query (sqlQuery);
        
        result = result[0].total;
        result = parseInt(result);

        // get the total number of page
        const pages = Math.ceil(result / limit);

        // query to get the client
        const sqlQuery2 = 'SELECT * FROM user WHERE role = "restaurateur" LIMIT ' + limit + ' OFFSET ' + offset;
        var result2 = await pool.query (sqlQuery2);

        // change date format for created_at and updated_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
        for (var i = 0; i < result2.length; i++) {
            var date = new Date(result2[i].created_at);
            result2[i].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
            var date = new Date(result2[i].updated_at);
            result2[i].updated_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }

        // send + pages number
        res.status(200).json({result2, pages});


    }catch(err){
        res.status(400).json({message: err.message});
    }
});


router.post("/get/livreur/:page", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        
        // get page number 
        const page = req.params.page;

        // get the number of client per page
        const limit = 20;

        // get the offset
        const offset = (page - 1) * limit;

        // get the total number of client
        const sqlQuery = 'SELECT COUNT(*) AS total FROM user WHERE role = "livreur"';
        var result = await pool.query (sqlQuery);
        
        result = result[0].total;
        result = parseInt(result);

        // get the total number of page
        const pages = Math.ceil(result / limit);

        // query to get the client
        const sqlQuery2 = 'SELECT * FROM user WHERE role = "livreur" LIMIT ' + limit + ' OFFSET ' + offset;
        var result2 = await pool.query (sqlQuery2);

        // change date format for created_at and updated_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
        for (var i = 0; i < result2.length; i++) {
            var date = new Date(result2[i].created_at);
            result2[i].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
            var date = new Date(result2[i].updated_at);
            result2[i].updated_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }

        // send + pages number
        res.status(200).json({result2, pages});


    }catch(err){
        res.status(400).json({message: err.message});
    }
});


router.post("/get/:id", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // get the id of the user
        const id = req.params.id;

        // query to get the user
        const sqlQuery = 'SELECT * FROM user WHERE iduser = ?';
        var result = await pool.query (sqlQuery, [id]);

        // change date format for created_at and updated_at into format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
        var date = new Date(result[0].created_at);
        result[0].created_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        var date = new Date(result[0].updated_at);
        result[0].updated_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

        // send the user
        res.status(200).json(result[0]);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.put("/update/:id", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // get the id of the user
        const id = req.params.id;

        // get the user data
        var {first_name, last_name, email, role, isActive} = req.body;
        if(isActive == true) isActive = 1;
        else isActive = 0;
        // get datetime for updated_at in format YYYY/MM/DD HH:mm containing 0 for exemple janvier = 01
        var date = new Date();
        var updated_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

        // query to update the user
        const sqlQuery = 'UPDATE user SET first_name = ?, last_name = ?, email = ?, role = ?, updated_at = ?, isActive = ? WHERE iduser = ?';
        var result = await pool.query(sqlQuery, [first_name, last_name, email, role, updated_at, isActive, id]);

        // send the user
        res.status(200).json({message: "User updated"});
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/delete/:id", async(req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // get the id of the user
        const id = req.params.id;

        // query to delete the user
        const sqlQuery = 'DELETE FROM user WHERE iduser = ?';
        var result = await pool.query(sqlQuery, [id]);  

        // send the user
        res.status(200).json({message: "User deleted"});
    }catch(err){
        res.status(400).json({message: err.message});
    }
});



module.exports = router;