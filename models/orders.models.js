const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                require: true
            },
            quantity: Number,
            price: Number

        
        }
    ],
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    total: Number,
    status: {
        type: String,
        default: "Pendiente"
    }
    
})


module.exports = mongoose.model("Order", orderSchema);