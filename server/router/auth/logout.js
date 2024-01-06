// logout.js
const express = require("express");
const authenticate = require("../../middleware/jwt/jwt");

const router = express.Router();

router.post("/", authenticate, (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("rem");
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Logout successful" });
  });
});

module.exports = router;
