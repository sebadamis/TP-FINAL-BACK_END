const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controllers.js");
const validation = require("../middlewares/auth");


// obtener todas las ordenes de compra
router.get("/orders",validation, orderController.getOrders);


//crear orden de compra
router.post("/orders",validation, orderController.createOrder);

//borrar orden de compra
router.delete("/orders/:_id", validation, orderController.borrarOrder);


// obtener producto por id
router.get("/products/:_id",validation, orderController.getProductsById);


//actualizar orden de compra
router.put("/orders/:_id", validation, orderController.updateOrder);



module.exports = router;