const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose
  .connect(process.env.CONECTION_URL)
  .then((res) => {
    console.log("connected to the DB");
  })
  .catch((err) => {
    console.log(err);
  });
