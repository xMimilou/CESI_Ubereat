const mongoose = require("mongoose");

const PostsModel = mongoose.model(
  "cesi_ubereat",
  {
    order_id: {
        type: String,
        required : true
    },
    user_id: {
        type: String,
        required: true
    },
    order_time: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    }
  },
  "orders_choosen"
);

module.exports = { PostsModel };