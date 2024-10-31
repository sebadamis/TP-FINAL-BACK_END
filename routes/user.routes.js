const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const validation = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const uploadUsers = require("../middlewares/uploadFile.Users");

router.get("/users",validation, userControllers.getUsers);

router.post("/users",[validation, isAdmin, uploadUsers], userControllers.createUser);


// get user por ID
router.get("/users/:id",validation, userControllers.getUserById);


// borrar usuario
router.delete("/users/:id",[validation, isAdmin], userControllers.borrarUser);

// update usuario
router.put("/users/:id",[validation, isAdmin], userControllers.updateUser);


// login para autenticar usuario
router.post("/login", userControllers.login);

// devolvemos router para ser reutilizado
module.exports = router;