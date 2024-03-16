const mongoose = require("mongoose");
const sellerSchema = require("./sellerSchema");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  specifiqueLocation: {
    type: String,
  },
  serviceOfred: [String],
  availability: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },

  favImg: Number,
  images: [
    {
      type: String,
    },
  ],

  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
