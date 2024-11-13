const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                require: true,
            },
            quantity: {
                type: Number,
                require: true,
            },
            price: Number,
        }
    ],
    total: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "Pendiente",
    },
})


module.exports = mongoose.model("Order", orderSchema);