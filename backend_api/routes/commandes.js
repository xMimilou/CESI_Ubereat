const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../helpers/database.js')


const { commandesModel } = require('../models/commandesModels');
const { default: mongoose } = require('mongoose');


/* ----------------------- */
/* ---- GET REQUESTS ----- */
/* ----------------------- */

/* duplicata avec la commande ci-dessous */
router.get("/count/commandes", async (req, res) => {
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

router.get("/count", async (req, res) => {
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

/* ----------------------- */

router.get("/count/commandes/today", async (req, res) => {
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


router.get("/count/CA", async (req, res) => {
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





router.get("/all/available", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        //console.log("Ici");
        const delivery_username = '';
        const status = "En cours";

        commandesModel.find({
            'delivery_person.deliver_username':{$eq: delivery_username},
            'order.status': {$eq: status}}, (err, docs) => {
            if(!err) res.send(docs);
            else {
                console.log("Error to get data : " + err);
                res.status(500).send({error: 'Error getting data from the database'});
            }
        });
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
});


router.get("/all/username", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        var username = req.body.username;
        commandesModel.find({
            'username':{$eq: username}
        }, (err, docs) => {
            if(!err) res.send(docs);
            else {
                console.log("Error to get data : " + err);
                res.status(500).send({error: 'Error getting data from the database'});
            }
        });
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
});




router.get("/graph/commandes/minutes", async (req, res) => {
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
                    // check if the day is the same
                    if(commande.order.time_placed.slice(0,10) == date.toISOString().slice(0,10)){
                        // check if the commande time is in the chartData array
                        for(var i = 0; i < chartData.length; i++){
                            if(chartData[i][0] == commandeTime){
                                chartData[i][1]++;
                            }
                        }
                    }

                });
                // reverse the array to have the last commande at the top except the first element
                res.status(200).json(chartData);
            }
        });
        

    } catch(err){
        res.status(400).json({message: err.message});
    }
});


router.get("/list/top/client", async (req, res) => {
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


/* return all commands made by user in correct time periode */
router.get("/user/:username", async (req, res) => {
    try{ 
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        var commandesToday = [];

        // get all commandes in mongo db with order.delivery = today and order.status != "delivered"
        commandesModel.find({client: req.params.username}, function (err, commandes) {
            // if there is an error
            if (err) {
                res.status(400).json({message: err.message});
            }
            // if there is no error
            else {
                // for all commandes check if the order.delivery is today in format YYYY-MM-DD
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;

                // compare the order.delivery at format YYYY-MM-DD HH:mm with today at format YYYY-MM-DD
                commandes.forEach(function(commande) {
                    var commandeDate = commande.order.time_delivered.slice(0,10);
                    if(commandeDate == today && commande.order.status != "delivered"){
                        commandesToday.push(commande);
                    }
                });
                res.status(200).json(commandesToday);

                // return the array
            }});


            
            



    } catch(err){
        res.status(400).json({message: err.message});
    }
});

router.get("/notification", async (req, res) => {
    try{
        
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        var username = req.header('username');
        var status = req.header('status');

        // get all commandes in mongo db with order.delivery = today and order.status != "delivered"
        commandesModel.find({}, function (err, commandes) {
            // if there is an error
            if (err) {
                res.status(400).json({message: err.message});
            }
            // if there is no error
            else {
                
                // for all commandes check if the order.delivery is today in format YYYY-MM-DD
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                //console.log("--------------------");
                isNewStatus = "";
                // if commandes where username is equal to username in the token, check if status of the commandes was updated if true send notification with the new status
                commandes.forEach(function(commande) {
                    if(commande.username == username){
                        var commandeDate = commande.order.time_delivered.slice(0,10);
                        // compare the order.delivery at format YYYY-MM-DD HH:mm with today at format YYYY-MM-DD HH:mm if time of today is lower than time of order.delivery 
                        if(commande.order.status != status){
                            if(commandeDate==today){
                                // try if HH:mm of today is lower than HH:mm of order.delivery
                                try{
                                    var todayTime = today.slice(11,16);
                                    var commandeTime = commande.order.time_delivered.slice(11,16);
                                    if(todayTime < commandeTime){
                                        //console.log("notification sent");
                                        isNewStatus = commande.order.status;
                                    }
                                } catch(err){
                                    console.log(err.message);
                                }
                            }
                        }

                    }
                });
                if (isNewStatus != ""){
                res.status(200).json({status: isNewStatus});
                } else {
                res.status(200).json({status: "no change"});
                }
                
            }});
    } catch(err){
        res.status(400).json({message: err.message});
    }
    
});



/* ----------------------- */
/* ---- POST REQUESTS ---- */
/* ----------------------- */


router.post("/count/username", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        const user = req.body.username;
        //console.log(user);
        // count all commandes in the database mongo where client is equal to user
        commandesModel.countDocuments({client: user}, function (err, count) {
            if (err) {
                res.status(400).json({message: err.message});
            }
            else {
                res.status(200).json({count: count});
            }
        }
        );
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
});


router.post("/selected/deliver", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        const deliverUsername =  req.body.deliverUsername;
        const status = "Delivered";
        //console.log(deliverUsername + " " + status);
        commandesModel.find({
            'delivery_person.deliver_username':{$eq: deliverUsername},
            'order.status': {$ne: status}
        }, (err, docs) => {
            if(!err) res.send(docs);
            else {
                console.log("Error to get data : " + err);
                res.status(500).send({error: 'Error getting data from the database'});
            }
        });
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
});



router.post("/selected", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        
        const { id } = req.body;
        const status = "En cours";
        commandesModel.find({
            '_id':{$eq: id}
        }, (err, docs) => {
            if(!err) res.send(docs);
            else {
                console.log("Error to get data : " + err);
                res.status(500).send({error: 'Error getting data from the database'});
            }
        });
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
});


/* ----------------------- */
/* ---- PUT REQUESTS ----- */
/* ----------------------- */


router.put("/update", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        const {statusDeliver, usernameLivreur} = req.body;
        const { id } = req.body;

        console.log(id);
        //console.log(username + " " + costumerAddress + " " + restaurantAdress + " " + restaurantName + " " + total_price + " " + time_delivered + " " + statusDeliver + " " + usernameLivreur);
        console.log(id);
        const commande = await commandesModel.findOne({
            '_id': {$eq: id}
        });
        console.log(commande);
        if(!commande) return res.status(401).json({message: "Commande not found"});
        commande.order.status = statusDeliver;
        commande.delivery_person.deliver_username = usernameLivreur;
        console.log(commande);

        await commande.save();
        res.json({message: "Commande updated"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

router.put("/update/validation/restaurant", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        const {username, costumerAddress, restaurantAdress, restaurantName, time_delivered, inputContent, time_placed, usernameLivreur} = req.body;
        const statusDeliver = "Livraison";
 
        //console.log(username + " " + costumerAddress + " " + restaurantAdress + " " + restaurantName + " " + time_placed + " " + time_delivered + " " + statusDeliver + " " + usernameLivreur + "" + inputContent);
        // console.log("Nom du livreur " + usernameLivreur);
        // console.log("Adresse du client " + costumerAddress);
        // console.log("Adresse du restaurant " + restaurantAdress);
        // console.log("Nom du restaurant " + restaurantName);
        // console.log("Code du restaurant " + inputContent);
        // console.log("Nom du client " + username);

        const commande = await commandesModel.findOne({
            'client': {$eq: username},
            'delivery_person.deliver_username': {$eq: usernameLivreur},
            'delivery_person.delivery_location': {$eq: costumerAddress},
            'restaurant.location': {$eq: restaurantAdress},
            'restaurant.name': {$eq: restaurantName},
            'code_restaurateur': {$eq: inputContent}
        });
        if(!commande) return res.status(404).json({message: "Commande not found"});
        commande.order.status = statusDeliver;
        await commande.save();
        res.json({message: "Code Restaurateur Valide"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
});


router.put("/update/validation/client", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        console.log("test");
        const {username, costumerAddress, restaurantAdress, restaurantName, time_delivered, inputContent, time_placed, usernameLivreur} = req.body;
        const statusDeliver = "Delivered";
        // console.log("Nom du livreur " + usernameLivreur);
        // console.log("Adresse du client " + costumerAddress);
        // console.log("Adresse du restaurant " + restaurantAdress);
        // console.log("Nom du restaurant " + restaurantName);
        // console.log("Code du client " + inputContent);
        // console.log("Nom du client " + username);
        
        const commande = await commandesModel.findOne({
            'client': {$eq: username},
            'delivery_person.deliver_username': {$eq: usernameLivreur},
            'delivery_person.delivery_location': {$eq: costumerAddress},
            'restaurant.location': {$eq: restaurantAdress},
            'restaurant.name': {$eq: restaurantName},
            'code_client': {$eq: inputContent}
        });
        if(!commande) return res.status(404).json({message: "Commande not found"});
        commande.order.status = statusDeliver;
        await commande.save();
        res.json({message: "Code Client Valide"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

/* ----------------------- */
/* ---- DELETE REQUESTS -- */
/* ----------------------- */


module.exports = router;

