const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "your_user",
  password: "your_password",
  database: "expressSqlDB",
});

db.connect();

module.exports = db;
