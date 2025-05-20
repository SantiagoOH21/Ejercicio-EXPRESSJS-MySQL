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
    "CREATE TABLE categories (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), description TEXT)";
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

//ADD
app.post("/addCategory", (req, res) => {
  const { name, description } = req.body;
  const sql = `INSERT INTO categories (name, description) values ('${name}', '${description}');`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Category added...");
  });
});

app.post("/addProduct", (req, res) => {
  const { name, description, price, category_id } = req.body;
  const sql = `INSERT INTO products (name, description, price, category_id) values ('${name}', '${description}', '${price}', '${category_id}');`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Product added...");
  });
});

//UPDATE
app.put("/products/id/:id", (req, res) => {
  const id = +req.params.id;
  const getProducts = "SELECT * FROM products";
  db.query(getProducts, (pErr, pRes) => {
    if (pErr) {
      console.log(pErr);
      return;
    }

    const products = pRes;
    const found = products.some((product) => product.id === id);
    if (found) {
      let sql = "UPDATE products SET ";
      const updates = [];
      if (req.body.name) {
        updates.push(`name = '${req.body.name}'`);
      }
      if (req.body.description) {
        updates.push(`description = '${req.body.description}'`);
      }
      if (req.body.price) {
        updates.push(`price = ${req.body.price}`);
      }
      if (req.body.category_id) {
        updates.push(`category_id = ${req.body.category_id}`);
      }
      sql += updates.join(", ");
      sql += ` WHERE id = ${req.params.id}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Product updated...");
      });
    }
  });
});

app.put("/categories/id/:id", (req, res) => {
  const id = +req.params.id;
  const getCategories = "SELECT * FROM categories";
  db.query(getCategories, (cErr, cRes) => {
    if (cErr) {
      console.log(cErr);
      return;
    }

    const categories = cRes;
    const found = categories.some((category) => category.id === id);
    if (found) {
      let sql = "UPDATE categories SET ";
      const updates = [];
      if (req.body.name) {
        updates.push(`name = '${req.body.name}'`);
      }
      if (req.body.description) {
        updates.push(`description = '${req.body.description}'`);
      }

      sql += updates.join(", ");
      sql += ` WHERE id = ${req.params.id}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Category updated...");
      });
    }
  });
});

//SHOW PRODUCTS & CATEGORIES
app.get("/allProducts", (req, res) => {
  const sql = `SELECT * FROM products`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/allCategories", (req, res) => {
  const sql = `SELECT * FROM categories`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//

app.get("/selectProducts/id/:id", (req, res) => {
  const sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/products/orderDesc", (req, res) => {
  const sql = `SELECT * FROM products ORDER BY id DESC`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/selectCategories/id/:id", (req, res) => {
  const sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/selectProducts/name/:name", (req, res) => {
  const sql = `SELECT * FROM products WHERE name LIKE '%${req.params.name}%'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/delProducts/:id", (req, res) => {
  const sql = `DELETE FROM products WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Product deleted");
  });
});

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
