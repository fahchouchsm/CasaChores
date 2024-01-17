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
    required: function () {
      return this.sellerType === "company";
    },
  },

  services: [
    {
      mainCategorie: {
        type: mongoose.Types.ObjectId,
        ref: "MainCategorie",
        required: true,
      },
      subCategorie: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "SubCategorie",
      },
    },
  ],
});

module.exports = mongoose.model("Seller", sellerSchema);
