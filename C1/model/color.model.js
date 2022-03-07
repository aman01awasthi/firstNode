/** @format */

const mongoose = require("mongoose");

const colorSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("color", colorSchema);
