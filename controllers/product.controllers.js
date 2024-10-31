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

        if(req.file){
            product.image = req.file.filename;
        }

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

async function getProductsById(req, resp) {
    
    try {

        const { _id } = req.params;


        const product = await Product.findById(_id);

        if (!product) {
            return resp.status(404).send("el producto NO fue encontrado");
        }

        // user.password = undefined;

        return resp.status(200).send(product);

    } catch (error) {
        console.log(error)
        return resp.status(500).send("error al obtener el producto");
    }
}

async function borrarProduct(req, resp) {
    
    try {
        

        const { _id } = req.params;

        const borrarProducto = await Product.findByIdAndDelete(_id)

        
        return resp.status(200).send({message: "el producto fue borrado correctamente", borrarProducto});

    } catch (error) {
        console.log(error);
        return resp.status(500).send("error al borrar el producto");
    }

}


// update usuario
async function updateProduct(req, resp) {
    
    try {

        const {_id} = req.params;
        

    const product = await Product.findByIdAndUpdate(_id, req.body, {new: true});

    // console.log(user);

    return resp.status(200).send({
        ok: true,
        message: "producto actualizado correctamente",
        product
    })

        

    } catch (error) {
        console.log(error);
        return error;
    }
}



module.exports = {
    getProducts,
    createProduct,
    getProductsById,
    borrarProduct,
    updateProduct
}