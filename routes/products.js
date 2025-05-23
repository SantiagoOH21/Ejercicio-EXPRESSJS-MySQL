const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");

router.post("/addProduct", ProductController.addProduct);

router.put("/id/:id", ProductController.updateProduct);

router.get("/allProducts", ProductController.getAll);

router.get("/productCategory", ProductController.getProductCategory);

router.get("/id/:id", ProductController.getById);

router.get("/orderDesc", ProductController.orderDesc);

router.get("/name/:name", ProductController.getByName);

router.delete("/delete/:id", ProductController.deleteProduct);

module.exports = router;
