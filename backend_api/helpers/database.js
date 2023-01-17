const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'cesi',
    password: 'cesi',
    database: 'cesi_ubereat',
    connectionLimit: 5
});

// connect and check for errors
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();

    return;
});


module.exports = pool;