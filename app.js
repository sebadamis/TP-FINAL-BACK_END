const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user.routes");
const productsRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");


app.use(express.json());

app.use(cors());

app.use(express.static("public"));

app.use([ userRoutes, productsRoutes, categoryRoutes ]);

module.exports = app;