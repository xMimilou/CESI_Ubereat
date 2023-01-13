const mongoose = require("mongoose");

const PostsModel = mongoose.model(
  "cesi_ubereat",
  {
    username: {
        type: String,
        required: true
    },
    order_time: {
        type: String,
        required: false
    },
    costumerAddress: {
        type: String,
        required: true
    },
    restaurantAdress: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },time_delivered:{
        type: String,
        required : true
    
    },
    statusDeliver:{
        type: String,
        required : true
    },
    usernameLivreur:{
        type: String,
        required : true
    }
  },
  "orders_choosen"
);

module.exports = { PostsModel };