const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controllers.js");
const validation = require("../middlewares/auth");


// obtener todas las ordenes de compra
router.get("/orders",validation, orderController.getOrders);


//crear orden de compra
router.post("/orders",validation, orderController.createOrder);








module.exports = router;