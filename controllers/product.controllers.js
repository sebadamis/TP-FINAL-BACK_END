const Product = require("../models/products.models");


async function getProducts(req, resp){
    try {
        
        const products = await Product.find();

        return resp.status(200).send({
            message: "obtener todos los productos",
            products
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            message: "error al obtener los productos"
        });
    }
    
}

async function createProduct(req, resp){
    try {

        console.log(req.body);

        const product = new Product(req.body);
        const newProduct = await product.save();

        return resp.status(201).send({
            message: "creaste un producto",
            product: newProduct
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            message: "error al crear producto"
        });
    }
    
    
    
}



module.exports = {
    getProducts,
    createProduct
}