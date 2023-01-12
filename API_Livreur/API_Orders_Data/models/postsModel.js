const mongoose = require("mongoose");

const PostsModel = mongoose.model(
  "cesi_ubereat",
  {
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    customer_username: {
        type: String,
        required: true
    },
    restaurant: {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    },
    order: {
        items: [
            {
                name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                unit_price: {
                    type: Number,
                    required: true
                }
            }
        ],
        total_cost: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        time_placed: {
            type: Date,
            required: true,
            default: Date.now
        },
        time_delivered: {
            type: Date,
            required: false
        }
    },
    delivery_person: {
        deliver_username: { 
            type: String, 
            required: true 
        },
        delivery_location: { 
            type: String, 
            required: true 
        },
    }
  },
  "orders"
);

module.exports = { PostsModel };