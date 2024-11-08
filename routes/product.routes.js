const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");
const validation = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const uploadProducts = require("../middlewares/uploadFile.Products");


//obtener productos
router.get("/products", productController.getProducts);

// crear producto
router.post("/products",[validation, isAdmin, uploadProducts], productController.createProduct);

// obtener producto por id
router.get("/products/:_id", productController.getProductsById);

// actualizar producto
router.put("/products/:_id",[validation, isAdmin, uploadProducts], productController.updateProduct);


//borrar producto
router.delete("/products/:_id",[validation, isAdmin], productController.borrarProduct);



module.exports = router;