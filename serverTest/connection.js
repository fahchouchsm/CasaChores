const mongoose = require("mongoose");
require("dotenv").config();

console.log("connecting to DB...");
module.exports = mongoose
  .connect(process.env.CONECTION_URL)
  .then((res) => {
    console.log(`connected to the DB`);
  })
  .catch((err) => {
    console.log("Connexion err", err);
  });
