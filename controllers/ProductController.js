const db = require("../config/database.js");

const ProductController = {
  addProduct(req, res) {
    const { name, description, price, category_id } = req.body;
    // const post = { name: req.body.name, description: req.body.description, price: req.body.price, category_id: req.body.category_id  }
    const post = { name, description, price, category_id };
    const sql = "INSERT INTO products SET ?";
    db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Product added...");
    });
  },

  updateProduct(req, res) {
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
  },

  getAll(req, res) {
    const sql = `SELECT * FROM products`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  getProductCategory(req, res) {
    // const sql = `SELECT products.name, categories.name FROM products JOIN categories ON categories.id = products.category_id`;
    const sql = `SELECT products.id, products.name, categories.cat_name FROM products JOIN categories ON categories.id = products.category_id`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  getById(req, res) {
    const sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  orderDesc(req, res) {
    const sql = `SELECT * FROM products ORDER BY id DESC`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  getByName(req, res) {
    const sql = `SELECT * FROM products WHERE name LIKE '%${req.params.name}%'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  deleteProduct(req, res) {
    const sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Product deleted");
    });
  },
};

module.exports = ProductController;
