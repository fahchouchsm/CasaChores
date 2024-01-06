const mongoose = require("mongoose");

const subCategorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  shortKey: {
    type: Number,
    required: true,
    unique: true,
  },
});

const mainCategorieSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  subCategories: [subCategorieSchema],
});

module.exports = mongoose.model("MainCategorie", mainCategorieSchema);
