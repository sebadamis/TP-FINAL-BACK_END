const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const validation = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const uploadUsers = require("../middlewares/uploadFile.Users");

router.get("/users",[validation, isAdmin], userControllers.getUsers);

router.post("/users",[uploadUsers], userControllers.createUser);


// get user por ID
router.get("/users/:_id",[validation, isAdmin], userControllers.getUserById);


// borrar usuario
router.delete("/users/:_id",[validation, isAdmin], userControllers.borrarUser);

// update usuario
router.put("/users/:_id",[validation, isAdmin, uploadUsers], userControllers.updateUser);


// login para autenticar usuario
router.post("/login", userControllers.login);

// devolvemos router para ser reutilizado
module.exports = router;