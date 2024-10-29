const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");
const validation = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");


//obtener productos
router.get("/products",validation, productController.getProducts);

// crear producto
router.post("/products",[validation, isAdmin], productController.createProduct);

// obtener producto por id
router.get("/products/:id",validation, productController.getProductsById);

// actualizar producto
router.put("/products/:id",[validation, isAdmin], productController.updateProduct);


//borrar producto
router.delete("/products/:id",[validation, isAdmin], productController.borrarProduct);





module.exports = router;