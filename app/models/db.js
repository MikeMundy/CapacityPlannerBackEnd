const mysql2 = require("mysql2");
const dbConfig = require("../config/db.config.js");

var connection = mysql2.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;
