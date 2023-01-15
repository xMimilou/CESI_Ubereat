
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://127.0.0.1:27017/cesi_ubereat', 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (!err) console.log('MongoDB connection succeeded.');
        else console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
    }
);