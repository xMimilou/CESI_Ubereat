const mongoose = require('mongoose');

const commandesModel = mongoose.model(
    "orders", 
    {
        "client": { type: String, required: true }, // reference of restaurant id
        "restaurant": { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
        "order": {
            "menus": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
            "total_cost": { type: Number },
            "status": { type: String },
            "time_placed": { type: Date },
            "time_delivered": { type: Date },
            "delivery_person": {
                "deliver_username": { type: String },
                "delivery_location": { type: String },
            },
        },
        "code_client": { type: String },
        "code_restaurant": { type: String },
    },
    "orders"
);


const articleSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number,
    price: Number,
    image_url: {
        type: String,
    }
}, { collection: 'articles' });
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    price: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: false
    }
}, { collection: 'menus' });
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    opening_time: {
        type: Array,
        required: true
    },
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    image_url: {
        type: String,
        required: true
    }
}, { collection: 'restaurants' });

module.exports = { commandesModel };