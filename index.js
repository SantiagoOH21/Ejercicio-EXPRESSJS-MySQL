const express = require("express");
const app = express();
const mysql = require("mysql2");
app.use(express.json());
const port = 3003;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PASSWORD", // AQUÍ MI PASSWORD PARA HACER LAS PRUEBAS
  database: "expressSqlDB",
});

db.connect();

app.get("/createdb", (req, res) => {
  const sql = "CREATE DATABASE expressSqlDB";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

app.get("/createTableCategories", (req, res) => {
  const sql =
    "CREATE TABLE categories(id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), description TEXT)";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Categories table created...");
  });
});

app.get("/createTableProducts", (req, res) => {
  const sql =
    "CREATE TABLE posts(id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, category_id INT UNSIGNED,name VARCHAR(100), description TEXT, price DECIMAL(10,2), CONSTRAINT category_id_ibfk_1 FOREIGN KEY (category_id) REFERENCES categories(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Products table created...");
  });
});

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
