const router = require("express").Router();
const categoryControllers = require("../controllers/category.controllers");

// obtener categorias
router.get("/categories", categoryControllers.getCategories);

// crear categorias
router.post("/categories", categoryControllers.createCategory);



module.exports = router;