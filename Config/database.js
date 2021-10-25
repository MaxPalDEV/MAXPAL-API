const mysql = require('mysql');
require('dotenv').config();

/**
 * CONNEXION MySQL
 */
 const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME
  });

db.connect(function(err) {
    if (err) throw err;

  });

  module.exports = db;
