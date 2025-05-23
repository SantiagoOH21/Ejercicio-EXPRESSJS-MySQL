const db = require("../config/database.js");

const CategoryController = {
  addCategory(req, res) {
    const { cat_name, description } = req.body;
    const post = { cat_name, description };
    const sql = "INSERT INTO categories SET ?";
    db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Category added...");
    });
  },

  updateCategory(req, res) {
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
        if (req.body.cat_name) {
          updates.push(`cat_name = '${req.body.cat_name}'`);
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
  },

  getAll(req, res) {
    const sql = `SELECT * FROM categories`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  getById(req, res) {
    const sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
};

module.exports = CategoryController;
