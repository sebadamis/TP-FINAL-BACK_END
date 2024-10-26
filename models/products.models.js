const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, require: true},
    price: Number,
    description: String,
    category: String,
    image: String,
    createdAt: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
    // updatedAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Product", productSchema);