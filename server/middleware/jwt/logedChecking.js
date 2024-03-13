const express = require("express");
const authenticate = require("./jwt");
const userSchema = require("../../schema/userSchema");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  userSchema
    .findById(req.userId)
    .select("-password -settings")
    .then(async (foundUser) => {
      res.status(200).json({ userData: foundUser });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
