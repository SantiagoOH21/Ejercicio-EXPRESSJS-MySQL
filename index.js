const express = require("express");
const app = express();
const mysql = require("mysql2");
app.use(express.json());
const port = 3003;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
