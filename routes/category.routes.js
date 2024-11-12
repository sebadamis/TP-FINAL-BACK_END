const router = require("express").Router();
const categoryControllers = require("../controllers/category.controllers");
const validation = require("../middlewares/auth");

// obtener categorias
router.get("/categories",validation, categoryControllers.getCategories);

// crear categorias
router.post("/categories",validation, categoryControllers.createCategory);



module.exports = router;