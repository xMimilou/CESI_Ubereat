const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../helpers/database.js')


const { commandesModel } = require('../models/commandesModels');
const { default: mongoose } = require('mongoose');


router.post("/count/commandes", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // count all commandes in the database mongo
        commandesModel.countDocuments({}, function (err, count) {
            if (err) {
                res.status(400).json({message: err.message});
            } else {

                res.status(200).json(count);
            }
        });
        


    } catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/count/commandes/today", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // count commandes with order.time_place is same as today on mongo db
        var today = new Date();
        // get french date
        // where years mouth and day is same 
        
        // change today format into YYYY-MM-DD
        
        // add one day to today
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        today = tomorrow
        today.setHours(0,0,0,0);
        today = today.toISOString().slice(0,10);

        commandesModel.find({}, function (err, commandes) {
            if (err) {
                res.status(400).json({message: err.message});
            } else {
                // count the number of commandes with order.time_place is same as today
                var count = 0;
                commandes.forEach(function(commande) {
                    if(commande.order.time_placed.slice(0,10) == today){
                        count++;
                    }
                    //console.log(commande.order.time_placed.slice(0,10));

                    //console.log("today " + today);
                });
                res.status(200).json(count);
            }
        });



    } catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/count/CA", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // calculate the CA of all commandes by sum the order.total_cost of all the commandes in the database mongo
        commandesModel.find({}, function (err, commandes) {
            if (err) {
                res.status(400).json({message: err.message});
            } else {
                // add the total_cost of the commande to the CA float
                var CA = 0;
                commandes.forEach(function(commande) {
                    CA += parseFloat(commande.order.total_cost);

                });
                
                res.status(200).json(CA);
            }
        });


    } catch(err){
        res.status(400).json({message: err.message});
    }   
});

router.post("/graph/commandes/minutes", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // get nomber of commandes by minutes of last 10 minutes and make an array format
        // chartData: [
    //     ['Time', 'Nombre de ventes'],
    //     ['10:00', 5],
    //     ['10:01', 10],
    //     ['10:02', 11],
    //     ['10:03', 6],
    //     ['10:04', 7],
    //     ['10:05', 60],
    //     ['10:06', 30],
    //     ['10:07', 20],
    //     ['10:08', 1],
    //     ['10:09', 60],


    //   ],
        var chartData = [
            ['Time', 'Nombre de ventes'],
        ];
        var date = new Date();
        var minutes = date.getMinutes();
        var hours = date.getHours();
        // get last ten minutes and add them to the chartData array and display data as 13:59 and not 14:-1
        for(var i = 0; i < 10; i++){
            if(minutes < 10){
                chartData.push([hours + ':0' + minutes, 0]);
            } else {
                chartData.push([hours + ':' + minutes, 0]);
            }
            minutes--;
            if(minutes < 0){
                minutes = 59;
                hours--;
            }
        }

        // get all commandes from mongo db
        commandesModel.find({}, function (err, commandes) {
            if (err) {
                res.status(400).json({message: err.message});
            } else {
                // count the number of commandes with order.time_place is same as today
                commandes.forEach(function(commande) {
                    var commandeTime = commande.order.time_placed.slice(11,16);
                    chartData.forEach(function(data) {
                        if(data[0] == commandeTime){
                            data[1]++;
                        }
                    });
                });
                // reverse the array to have the last commande at the top except the first element
                res.status(200).json(chartData);
            }
        });
        

    } catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/list/top/client", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        // get all commandes from mongo db and sort them by order.total_cost and cumulate the total_cost of the same client
        commandesModel.find({}, function (err, commandes) {
            if (err) {
                res.status(400).json({message: err.message});
            } else {
                // count the number of commandes with order.time_place is same as today
                var clients = [];
                commandes.forEach(function(commande) {
                    var client = commande.username;
                    var total_cost = commande.order.total_cost;
                    var found = false;
                    clients.forEach(function(c) {
                        if(c.client == client){
                            c.total_cost += parseFloat(total_cost);
                            found = true;
                        }
                    });
                    if(!found){
                        clients.push({client: client, total_cost: parseFloat(total_cost)});
                    }
                });
                // sort the array by total_cost
                clients.sort(function(a, b){return b.total_cost - a.total_cost});
                // limit array to 5 lines
                clients.splice(5, clients.length - 5);
                res.status(200).json(clients);
            }
        });
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;
