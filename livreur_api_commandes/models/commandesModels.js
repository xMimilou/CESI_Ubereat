const mongoose = require('mongoose');
const { Int, Float } = require('mssql');

const commandesModel = mongoose.model(
    "commandes", 
    {
        "username": { type: String, required: true },
        "code_client" : { type: String, required: false },
        "code_restaurateur": { type: String, required: false },
        "restaurant": {
            "name": { type: String, required: true }, 
            "location": {type: String, required: true}
        },
        "order": {
            "items:": [
                {
                    "name": { type: String, required: true },
                    "quantity": { type: String, required: true },
                    "unit_price": { type: String, required: true },
                }
            ],
            "total_cost": { type: Number, required: true },
            "status": { type: String, required: true },
            "time_placed": { type: String, required: true },
            "time_delivered": { type: String, required: true },
        },
        "delivery_person": {
            "deliver_username": { type: String, required: true },
            "delivery_location": { type: String, required: true },
        }
    },
    "commandes"
);

module.exports = { commandesModel };