const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/cesi_ubereat", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
connectToDb();