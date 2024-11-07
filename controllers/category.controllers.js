const Category = require("../models/category.models");

async function getCategories(req, resp) {
    
    try {
        
        const categories = await Category.find();
        return resp.status(200).send({
            message: "Categorías obtenidas OK",
            categories: categories
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            message: "Error al obtener Categorías"
        })
    }
}

async function createCategory(req, resp) {
    
    try {
        
        const category = new Category(req.body);
        const newCategory = await category.save();

        return resp.status(200).send({
            message: "Creaste una nueva Categoría ",
            categories: newCategory
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            message: "Error al crear Categoría"
        })
    }

}


module.exports = {
    getCategories,
    createCategory
}