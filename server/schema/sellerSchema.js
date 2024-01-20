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

  address: {
    type: String,
  },

  whatsappLink: {
    type: String,
    required: true,
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
