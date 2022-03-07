/** @format */

const express = require("express");
const app = express();

app.use(express.json());

const productController = require("./controller/product.controller");
const sectionController = require("./controller/section.controller");
const colorController = require("./controller/colors.controller");

app.use("/product", productController);
app.use("/section", sectionController);
app.use("/color", colorController);

module.exports = app;
