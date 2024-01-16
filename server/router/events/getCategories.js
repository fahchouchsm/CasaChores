const express = require("express");
const categoriesSchema = require("../../schema/categoriesSchema");

const router = express.Router();

router.get("/categories", (req, res) => {
  categoriesSchema.find().then((result) => {
    res.json({ result });
  });
});

module.exports = router;
