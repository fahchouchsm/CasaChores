const express = require("express");
const router = express.Router();
const userSchema = require("../../schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/login", async (req, res) => {
  const { email, password, remember } = req.body;

  let foundUser = await userSchema.findOne({ email: email });
  let expiredTime;

  if (foundUser) {
    const passwordCheck = await bcrypt.compare(password, foundUser.password);
    if (passwordCheck) {
      // ? loged
      remember
        ? (expiredTime = 1000 * 60 * 60 * 24)
        : (expiredTime = 1000 * 60 * 60);
      // * token
      token = jwt.sign({ id: foundUser._id }, process.env.KEY, {
        expiresIn: expiredTime,
      });
      // * cookie
      res.cookie("rem", token, {
        expires: new Date(Date.now() + expiredTime),
        httpOnly: true,
      });
      // * session
      req.session.user = {
        id: foundUser._id,
        createdAt: Date.now(),
      };

      // ? response
      res.status(200).json({ message: "loged" });
    } else {
      res.status(400).json({
        message: "le mot de passe ou l'e-mail est invalide",
      });
    }
  } else {
    console.log(true);
    res.status(400).json({
      message: "le mot de passe ou l'e-mail est invalide",
    });
  }
});

module.exports = router;
