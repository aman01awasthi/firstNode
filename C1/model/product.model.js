/** @format */

const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
    section: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
      },
    ],
    price: { type: Number, required: true },
    colors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "color", required: true },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
