const express = require("express");
const router = express.Router();
const userSchema = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
const salt = 10;
const _ = require("lodash");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const {
    emailD,
    nameD,
    lastNameD,
    passwordD,
    confirmPasswordD,
    dayD,
    monthD,
    yearD,
  } = req.body;

  const passMatchErr = "Les mots de passe ne correspondent pas.";
  const passShortErr = "Le mot de passe est trop court.";
  const emailDuplicatedErr = `L'adresse ${emailD} est déjà utilisée.`;
  let expiredTime = 1000 * 60 * 60;

  try {
    const foundUser = await userSchema.findOne({ email: emailD });

    if (foundUser) {
      res.status(400).json({ error: emailDuplicatedErr });
    } else {
      if (passwordD !== confirmPasswordD) {
        res.status(400).json({ error: passMatchErr });
      } else if (passwordD.length < 5) {
        res.status(400).json({ error: passShortErr });
      } else {
        const hashedPass = await bcrypt.hash(passwordD, salt);
        const newUser = new userSchema({
          email: _.toLower(emailD),
          name: _.capitalize(_.trim(nameD)),
          lastName: _.capitalize(_.trim(lastNameD)),
          password: hashedPass,
          birth: new Date(yearD, monthD + 1, dayD),
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.KEY, {
          expiresIn: expiredTime,
        });

        // * cookie
        res.cookie("rem", token, {
          expires: new Date(Date.now() + expiredTime),
          httpOnly: true,
        });

        // * session
        req.session.user = {
          id: savedUser._id,
          createdAt: Date.now(),
        };

        res.status(200).json({ message: "User registered successfully" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
