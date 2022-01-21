const mysql2 = require("mysql2");
const dbConfig = require("../config/db.config.js");
const fs = require("fs");

const serverCa = [fs.readFileSync(dbConfig.DB_SSL, "utf8")];

var connection = mysql2.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  ssl: {
    rejectUnauthorized: false,
    ca: serverCa
  }
});

module.exports = connection;
