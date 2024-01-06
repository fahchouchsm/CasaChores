const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cities: [
    {
      name: {
        type: String,
        unique: true,
      },
    },
  ],
});
