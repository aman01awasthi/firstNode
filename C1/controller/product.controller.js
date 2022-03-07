/** @format */

const express = require("express");
const router = express.Router();

const Product = require("../model/product.model");

const crudController = require("./crudController");

// router.get("", crudController(Product).get);

//show all products
router.get("", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "section", select: { title: 1 } })
      .populate({ path: "colors", select: { title: 1 } })
      .lean()
      .exec();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//products higher than 500rs
router.get("/sortproducts", async (req, res) => {
  try {
    const products = await Product.find({ price: { $gt: 500 } })
      .populate({ path: "section", select: { title: 1 } })
      .populate({ path: "colors", select: { title: 1 } })
      .lean()
      .exec();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//total number of products
router.get("/totalproducts", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "section", select: { title: 1 } })
      .populate({ path: "colors", select: { title: 1 } })
      .lean()
      .exec();

    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].colors.length;
    }
    let total = sum * products.length;
    return res.status(200).send({ TotalProducts: total });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//product having most colors
router.get("/mostcolors", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ colors: -1 })
      .limit(1)
      .populate({ path: "section", select: { title: 1 } })
      .populate({ path: "colors", select: { title: 1 } })
      .lean()
      .exec();

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//products atleast one color matches
router.get("/colors/:colorid", async (req, res) => {
  try {
    const products = await Product.find({
      colors: { $all: [req.params.colorid] },
    })
      .populate({ path: "section", select: { title: 1 } })
      .populate({ path: "colors", select: { title: 1 } })
      .lean()
      .exec();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//find products available in more than 3 different colors
router.get("/morethanthreecolors", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "section", select: { title: 1 } })
      .populate({ path: "colors", select: { title: 1 } })
      .lean()
      .exec();

    let sum = 0;
    let newProducts = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].colors.length > 3) {
        newProducts.push(products[i]);
      }
    }
    return res.status(200).send(newProducts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//products used by men and women
router.get("/section/men/:menid/women/:womenid", async (req, res) => {
  try {
    const products = await Product.find({
      section: { $all: [req.params.menid, req.params.womenid] },
    })
      .populate({ path: "section", select: { title: 1 } })
      .populate({ path: "colors", select: { title: 1 } })
      .lean()
      .exec();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("", crudController(Product).post);
router.get("/:id", crudController(Product).getOne);
router.patch("/:id", crudController(Product).updateOne);
router.delete("/:id", crudController(Product).deleteOne);

module.exports = router;


