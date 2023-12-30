const express = require("express");
const router = express.Router();
const fashionProductController = require("../controllers/fashionProductController");

// Example route to get all fashion products
router.get("/products", fashionProductController.getAllFashionProducts);
router.get("/test", fashionProductController.getTest);
router.get("/first", fashionProductController.getFirstFashionProduct);
module.exports = router;
