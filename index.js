const express = require("express");
const app = express();
const mysql = require("mysql2");
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

db.connect();
