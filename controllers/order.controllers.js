const Order = require("../models/orders.models.js");
const Product = require("../models/products.models");


async function getOrders(req, resp){
    try {
        
        const orders = await Order.find()
                                    .populate("user", "name email")
                                    .populate("products.product", "name price image");

        console.log(req.body);
        
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

        // console.log(req.body);

        const order = new Order(req.body);
        

        const newOrder = await order.save();

        return resp.status(201).send({
            message: "creaste una orden de compra",
            newOrder
        });

    } catch (error) {
        console.log(error);
        return resp.status(401).send({
            message: "Error al crear orden de compra",
            error
        });
    }
    
    
}

async function borrarOrder(req, resp) {
    
    try {
        

        const { _id } = req.params;

        const borrarOrder = await Order.findByIdAndDelete(_id)

        
        return resp.status(201).send({
            message: "la orden de compra fue borrada correctamente", 
            orders: borrarOrder
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            message: "error al borrar el usuario",
            error
        });
    }

}

async function getProductsById(req, resp) {
    
    try {

        const { _id } = req.params;


        const product = await Product.findById(_id)
                                    // .populate("user", "name email")
                                    // .populate("products.product", "name price image");

        if (!product) {
            return resp.status(404).send({
                message: "el producto NO fue encontrado",
                products: product
            });
        }


        return resp.status(200).send({
            message: "se encontró el producto",
            products: product
        });

    } catch (error) {
        console.log(error)
        return resp.status(500).send("error al obtener el producto");
    }
}

async function updateOrder(req, resp){

    try {
        
        const { _id } = req.params;

        let orderById = await Order.findById(_id);

        orderById.user = req.body.user._id;
        orderById.products = req.body.products;        
        orderById.total = req.body.total;
        orderById.status = req.body.status;

        
                                                                // , {new: true}
        const orderUpdated = await Order.findByIdAndUpdate(_id, orderById);


        return resp.status(200).send({
            message: "orden modificada",
            orders: orderUpdated
        });


    } catch (error) {
        // console.log(error);
        return resp.status(501).send({
            message: "orden de compra no encontrada",
            error
        })
    }




}


module.exports = {
    getOrders,
    createOrder,
    borrarOrder,
    getProductsById,
    updateOrder
}