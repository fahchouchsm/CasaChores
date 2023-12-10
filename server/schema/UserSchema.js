const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  birth: {
    type: Date,
    required: true,
  },
  dateRegister: {
    type: Date,
    default: Date.now(),
  },
  seller: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
