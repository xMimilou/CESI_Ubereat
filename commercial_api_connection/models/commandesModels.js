const mongoose = require('mongoose');

const usersModel = mongoose.model(
    "users", 
    {
        
    },
    "users"
);

module.exports = { usersModel };