const mongoose = require("mongoose");

const FollowedOrders = mongoose.model(
  "orders_choosen",
  {
    username: {
        type: String,
        required: false
    },
    order_time: {
        type: String,
        required: false
    },
    costumerAddress: {
        type: String,
        required: false
    },
    restaurantAdress: {
        type: String,
        required: false
    },
    restaurantName: {
        type: String,
        required: false
    },
    total_price: {
        type: Number,
        required: false
    },
    time_delivered:{
        type: String,
        required : false
    
    },
    statusDeliver:{
        type: String,
        required : false
    },
    usernameLivreur:{
        type: String,
        required : false
    }
  },
  "orders_choosen"
);

module.exports = { FollowedOrders };