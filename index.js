const express = require("express");
const app = express();
const port = 3003;

app.use(express.json());
app.use("/products", require("./routes/products.js"));
app.use("/categories", require("./routes/categories.js"));

//CREATE
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
    "CREATE TABLE categories (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, cat_name VARCHAR(100), description TEXT)";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Categories table created...");
  });
});

app.get("/createTableProducts", (req, res) => {
  const sql =
    "CREATE TABLE products (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), description TEXT, price DECIMAL(10,2) UNSIGNED, category_id INT UNSIGNED, CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Products table created...");
  });
});

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
