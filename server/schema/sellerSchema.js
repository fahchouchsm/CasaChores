const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  sellerType: {
    type: String,
    enum: ["individual", "company"],
  },
  bio: {
    type: String,
    maxlength: 255,
  },
  address: {
    type: String,
  },

  services: [
    {
      mainCategorie: {
        type: mongoose.Types.ObjectId,
        ref: "MainCategorie",
      },
      subCategorie: {
        type: mongoose.Types.ObjectId,
        ref: "SubCategorie",
      },
    },
  ],
});

module.exports = mongoose.model("Seller", sellerSchema);
