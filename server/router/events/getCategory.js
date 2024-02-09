const express = require("express");
const categoryPSchema = require("../../schema/category/categoryPSchema");
const categoryOSchema = require("../../schema/category/categoryOSchema");

const router = express.Router();

router.get("/category/presence", (req, res) => {
  categoryPSchema
    .find({}, { _id: 0, __v: 0 })
    .then((result) => {
      res.status(200).json({ msg: result });
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(400).json({ msg: false, data: err });
    });
});

router.get("/category/online", (req, res) => {
  categoryOSchema
    .find({}, { _id: 0, __v: 0 })
    .then((result) => {
      res.status(200).json({ msg: result });
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(400).json({ msg: false, data: err });
    });
});

module.exports = router;
