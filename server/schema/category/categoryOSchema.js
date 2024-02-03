const mongoose = require("mongoose");

const categoryOSchema = new mongoose.Schema({
  typeCat: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subCategory: [
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
});

module.exports = mongoose.model("categoryO", categoryOSchema, "categoryO");
