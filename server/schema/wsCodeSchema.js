const mongoose = require("mongoose");

const wsCodeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  code: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("WsCode", wsCodeSchema);
