// connect to mariadb database 
const mariadb = require('mariadb');
const config = {
    host: 'localhost',
    user: 'cesi',
    password: 'cesi',
    database: 'cesi_ubereat',
    connectionLimit: 10
};

// connect to mariadb
const pool = mariadb.createPool(config);



// const userSchema = new mongoose.Schema({
//     first_name: {
//         type: String,
//         required: true
//     },
//     last_name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     created_at: {
//         type: Date,
//     },
//     updated_at: {
//         type: Date,
//     },
//     referal_code: {
//         type: String,
//         unique: true,
//     },
//     referal_by: {
//         type: String,
//     },
//     referal_count: {
//         type: Number,
//         default: 0
//     },
//     role: {
//         type: String,
//         default: 'customer'
//     }
    

    
// })

//module.exports = mongoose.model('User', userSchema);
module.exports = pool;