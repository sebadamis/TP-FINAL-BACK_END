const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    user: {
        type: String,
        require: true
    },
    product: {
        type: String,
        require: true
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    category : {
        type: String
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})


module.exports = mongoose.model("Order", orderSchema);