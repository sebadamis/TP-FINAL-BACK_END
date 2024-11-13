const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    description: String,
    category: {type: String, require: true},
    image: String,
    createdAt: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
});


module.exports = mongoose.model("Product", productSchema);