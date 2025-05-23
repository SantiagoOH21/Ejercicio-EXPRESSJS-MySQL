const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController.js");

router.post("/addCategory", CategoryController.addCategory);

router.put("/id/:id", CategoryController.updateCategory);

router.get("/allCategories", CategoryController.getAll);

router.get("/id/:id", CategoryController.getById);

module.exports = router;
