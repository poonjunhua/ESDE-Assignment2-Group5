const mysql = require('mysql');
const config = require('./config.js');
const pool = mysql.createPool ({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = pool