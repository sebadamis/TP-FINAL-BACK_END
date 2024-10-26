const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");


//obtener productos
router.get("/products", productController.getProducts);

// crear producto
router.post("/products", productController.createProduct);





module.exports = router;