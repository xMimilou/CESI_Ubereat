const mongoose = require('mongoose');

const PostsModel = mongoose.model(
    "cesi_ubereat", 
    {
        "username": { type: String, required: true },
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
            "total_cost": { type: String, required: true },
            "status": { type: String, required: true },
            "time_placed": { type: String, required: true },
            "time_delivered": { type: String, required: true },
        },
        "delivery_person": {
            "deliver_username": { type: String, required: true },
            "delivery_location": { type: String, required: true },
        },
    },
    "commandes"
);

module.exports = { PostsModel };