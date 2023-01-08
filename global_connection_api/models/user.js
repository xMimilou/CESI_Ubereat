const sql = require('mssql');
require('dotenv').config();

// get .env variables
const config = {
    user: process.env.sql_username,
    password: process.env.sql_password,
    server: process.env.sql_server,
    database: process.env.sql_database,
    stream: false,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: false,
      },
  };

  console.log(process.env.sql_username);
sql.connect(config, err => {
    if (err) console.log(err);
    else console.log('Connected to SQL Server');
});

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
module.exports = config;