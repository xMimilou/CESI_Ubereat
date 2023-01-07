const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
    referal_code: {
        type: String,
        unique: true,
    },
    referal_by: {
        type: String,
    },
    referal_count: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'customer'
    }
    

    
})

module.exports = mongoose.model('User', userSchema);