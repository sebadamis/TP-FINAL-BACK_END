const mongoose = require("mongoose");

const Schema = mongoose.Schema;


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
        minlength: 4,
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
        minlength: 3,
        maxlength: 70,
        trim: true
    },
    pais: {
        type: String,
        require: true,
    },
    image: {
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
    comment: {type: String}
});

module.exports = mongoose.model("User", userSchema);