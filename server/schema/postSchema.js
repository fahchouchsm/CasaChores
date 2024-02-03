const mongoose = require("mongoose");

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
  sellerType: {
    type: String,
    enum: ["individual", "company"],
  },
  typeWork: {
    type: String,
    enum: ["presence", "online"],
  },
  serviceOfred: [String],
  availability: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    required: true,
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
  },

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
