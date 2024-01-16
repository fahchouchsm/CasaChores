const express = require("express");
const citySchema = require("../../schema/citySchema");

const router = express.Router();

router.get("/city", (req, res) => {
  citySchema
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {});
});

module.exports = router;
