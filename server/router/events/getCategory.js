const express = require("express");
const categoryPSchema = require("../../schema/category/categoryPSchema");

const router = express.Router();

router.get("/category/presence", (req, res) => {
  categorySchema
    .find({ typeCat: "presence" })
    .select("-_id")
    .then((result) => {
      res.status(200).json({ msg: result }); // Send the result directly
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(400).json({ msg: false, data: err });
    });
});

router.get("/category/online", (req, res) => {
  res.json;
});

module.exports = router;
