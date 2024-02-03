const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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
      subCategory: [
        {
          name: {
            type: String,
            required: true,
            unique: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("categorieP", categorySchema, "categorieP");
