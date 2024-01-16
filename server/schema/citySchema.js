const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("City", citySchema);
