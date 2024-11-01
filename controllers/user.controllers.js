// funciones para manejar distintas peticiones
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;


async function getUsers(req, resp) {
    
    try {
        
        const users = await User.find();
        console.log(users);
        
        return resp.status(200).send(users);

    } catch (error) {
        console.log(error);
        resp.status(500).send("error al obtener usuarios");
        
    }
}


async function createUser(req, resp){

    // encriptar password
    if(!req.body.password){
        return resp.status(400).send({
            ok: false,
            message: "la contraseña es obligatoria"
        });
    }
    
    const user = new User(req.body);

    if(req.file){
        user.image = req.file.filename;
    }

    bcrypt.hash(user.password, saltRounds, (error, hash)=> {
        
        if(error){
            console.log(error);
            return resp.status(500).send("error al crear usuario");
        }

        user.password = hash;

        user.save().then(nuevoUser => {

            console.log(nuevoUser);
            return resp.status(201).send(nuevoUser);

        }).catch(error => {
            console.log(error);
            return resp.send("el usuario no se pudo crear");
        });

    });

}

// get user por ID

// ERROR EN GET USER BY ID (CANNOT READ PROPERTIES OF UNDEFINED - ROLE)
async function getUserById(req, resp) {
    
    try {

        const { _id } = req.params;

        if(req.user.role !== "admin" && _id !== req.user._id){
            return resp.status(403).send({
                message: "no tienes permisos para acceder a este usuario"
            });
        }

        const user = await User.findById(_id);

        if (!user) {
            return resp.status(404).send("el usuario NO fue encontrado");
        }

        user.password = undefined;

        return resp.status(200).send(user);

    } catch (error) {
        console.log(error)
        return resp.status(500).send("error al obtener el usuario");
    }
}

// borrar usuario

async function borrarUser(req, resp) {
    
    try {
        

        const { _id } = req.params;

        const borrarUsuario = await User.findByIdAndDelete(_id)

        
        return resp.status(200).send({message: "el usuario fue borrado correctamente", borrarUsuario});

    } catch (error) {
        console.log(error);
        return resp.status(500).send("error al borrar el usuario");
    }

}


// update usuario
async function updateUser(req, resp) {
    
    try {

        const {_id} = req.params;

        if(req.user.role !== "admin" && _id !== req.user._id){
            return resp.status(403).send({
                message: "no tienes permiso para actualizar este usuario"
            })
        }

        // remover prop password (hacer el hash)

    const user = await User.findByIdAndUpdate(_id, req.body, {new: true});

    // console.log(user);

    return resp.status(200).send({
        ok: true,
        message: "usuario actualizado correctamente",
        user
    })

        

    } catch (error) {
        console.log(error);
        return error;
    }
}

async function login(req, resp){
    

    try {

        const { email, password } = req.body;
        console.log(email, password);

        if(!email || !password ) {
            return resp.status(400).send({
                message: "email y contraseña son requeridos"
            });
        }

        const user = await User.findOne({ email });

        if(!user){
            return resp.status(400).send({
                message: "alguno de los datos es incorrecto"
            });
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match){
            return resp.status(400).send({
                message: "alguno de los datos es erroneo"
            });
        }
        
        // datos que NO quiero que me muestre en la respuesta
        user.password = undefined;
        // user.role = undefined;
        user.__v = undefined;
        

        const token = jwt.sign(user.toJSON(), SECRET, {
            expiresIn: "1h"
        });

        console.log(token);



        return resp.send({
            message: "login exitoso",
            user,
            token
        })

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            message: "error al autenticar usuario"
        })
    }
}

// login para autenticar usuario



module.exports = { 
    getUsers,
    createUser,
    getUserById,
    borrarUser,
    updateUser,
    login
}


