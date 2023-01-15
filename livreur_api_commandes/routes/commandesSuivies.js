const express = require("express");
const router = express.Router();
const { FollowedOrders } = require("../models/commandesSuiviesModels");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/create", async (req, res) => {
    try {
        const token = req.header('auth-token');

        // check if the token is valid

        if(!token) return res.status(401).json({message: "Access denied"});

        const commande = new FollowedOrders(req.body);
        console.log("Ici");
        console.log(req.body);
        await commande.save();
        res.json({ message: "Commande created" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;