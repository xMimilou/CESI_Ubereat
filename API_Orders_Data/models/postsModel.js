const mongoose = require("mongoose");

const PostsModel = mongoose.model(
  "cesi_ubereat",
  {
user_id: {
        type: String,
        required: true
    },
    restaurant: {
       restaurant_name: {
          type: String,
           required: true
         },
        Menus: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
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
  "orders"
);

module.exports = { PostsModel };