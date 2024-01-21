const express = require("express");
const userSchema = require("../../schema/userSchema");
const sellerSchema = require("../../schema/sellerSchema");
const wsCodeSchema = require("../../schema/wsCodeSchema");
const authenticated = require("../../middleware/jwt/jwt");

const router = express.Router();

router.use(authenticated);

router.post("/seller/:id", async (req, res) => {
  const { typeSelc, userName, bio } = req.body;

  console.log(typeSelc, userName, bio);

  userSchema
    .findById(req.userId)
    .then(async (user) => {
      user.seller = true;
      await wsCodeSchema
        .findOne({ userId: user._id })
        .sort({ dateCreated: -1 })
        .then((result) => {
          user.phone = result.phone;
        });

      user.save().then((newUser) => {
        console.log(newUser);
        const newSeller = new sellerSchema({
          userId: newUser._id,
          userName,
          bio,
          sellerType: typeSelc == 1 ? "individual" : "company",
        });
        newSeller.save().then((result) => {
          console.log(result);
          res.json({ message: true });
        });
      });
    })
    .catch((err) => {
      res.json({ message: "Erreur lors de la création d'un nouveau vendeur" });
    });
});

module.exports = router;
