const express = require("express");
const citySchema = require("../../schema/citySchema");

const router = express.Router();

router.get("/city", (req, res) => {
  citySchema
    .find({}, { name: 1, _id: 0 })
    .sort({ name: 1 })
    .then((result) => {
      const names = result.map((city) => city.name);
      res.json(names);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
