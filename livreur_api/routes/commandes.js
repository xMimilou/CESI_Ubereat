const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const { commandesModel } = require('../models/commandesModels');
const { default: mongoose } = require('mongoose');


router.post("/all", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        commandesModel.find({}, (err, docs) => {
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

router.post("/all/available", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });
        console.log("Ici");
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

router.post("/selected", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        const { username_customer, costumer_adress, restaurant_name, restaurant_adress, total_price, timeDelivered } = req.body;
        const status = "En cours";
        console.log(username_customer + " " + costumer_adress + " " + restaurant_name + " " + restaurant_adress + " " + total_price + " " + timeDelivered);
        commandesModel.find({
            'delivery_person.deliver_username':{$eq: ""},
            'order.status': {$eq: status},
            'username': {$eq: username_customer},
            'delivery_person.delivery_location': {$eq: costumer_adress},
            'restaurant.name': {$eq: restaurant_name},
            'restaurant.location': {$eq: restaurant_adress},
            'order.total_cost': {$eq: total_price}
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

router.post("/selected/deliver", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        const deliverUsername =  req.body.deliverUsername;
        const status = "En cours";
        //console.log(deliverUsername + " " + status);
        commandesModel.find({
            'delivery_person.deliver_username':{$eq: deliverUsername},
            'order.status': {$eq: status}
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

router.put("/update", async (req, res) => {
    try{
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) return res.status(401).json({message: "Access denied"});
        });

        const {username, costumerAddress, restaurantAdress, restaurantName, total_price, time_delivered, statusDeliver, usernameLivreur} = req.body;
        console.log(username + " " + costumerAddress + " " + restaurantAdress + " " + restaurantName + " " + total_price + " " + time_delivered + " " + statusDeliver + " " + usernameLivreur);

        const commande = await commandesModel.findOne({
            'username': {$eq: username},
            'delivery_person.deliver_username': {$eq: ""},
            'delivery_person.delivery_location': {$eq: costumerAddress},
            'restaurant.location': {$eq: restaurantAdress},
            'restaurant.name': {$eq: restaurantName},
            'order.total_cost': {$eq: total_price}


        });
        if(!commande) return res.status(404).json({message: "Commande not found"});
        commande.status = statusDeliver;
        commande.delivery_person.deliver_username = usernameLivreur;
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
        console.log("Nom du livreur " + usernameLivreur);
        console.log("Adresse du client " + costumerAddress);
        console.log("Adresse du restaurant " + restaurantAdress);
        console.log("Nom du restaurant " + restaurantName);
        console.log("Code du restaurant " + inputContent);
        console.log("Nom du client " + username);

        const commande = await commandesModel.findOne({
            'username': {$eq: username},
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
        console.log("Nom du livreur " + usernameLivreur);
        console.log("Adresse du client " + costumerAddress);
        console.log("Adresse du restaurant " + restaurantAdress);
        console.log("Nom du restaurant " + restaurantName);
        console.log("Code du client " + inputContent);
        console.log("Nom du client " + username);
        
        const commande = await commandesModel.findOne({
            'username': {$eq: username},
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

module.exports = router;

