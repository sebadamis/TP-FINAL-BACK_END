const Order = require("../models/orders.models.js");


async function getOrders(req, resp){
    try {
        
        const orders = await Order.find().populate("user", "name email").populate("products.product", "name price image");

        return resp.status(200).send({
            message: "obtener todos los productos",
            orders
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            message: "error al obtener las ordenes de compra",
            error
        });
    }
    
}

async function createOrder(req, resp){
    try {

        console.log(req.body);

        const order = new Order(req.body);
        

        const newOrder = await order.save();

        return resp.status(201).send({
            message: "creaste una orden de compra",
            orders: newOrder
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            message: "error al crear orden de compra"
        });
    }
    
    
}




module.exports = {
    getOrders,
    createOrder
}