const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");


app.use(express.json());

app.use(cors());

app.use(express.static("public"));

app.use([ userRoutes, productRoutes, categoryRoutes, orderRoutes ]);

module.exports = app;