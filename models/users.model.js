const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// definir esquema de nuestro modelo

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 20
    },
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
        index: true,
        validate: {
            validator: (value) => {
                const regex = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

                return regex.test(value);
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 4,
        maxlength: 70,
        trim: true
    },
    datebirth: {
        type: String,
        require: true

        // validate: {
        //     validator: (value) => {
        //         const fecha = new Date(value);
        //         const hoy = new Date();
        //         return fecha < hoy;
        //     }
        // }
    },
    pais: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 100
    },
    Image: {
        type: String
    },
    role: {
        type: String,
        default: "cliente",
        enum: ["cliente", "admin", "superadmin"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comment: {type: String},
    price: {type: Number}
});

module.exports = mongoose.model("User", userSchema);