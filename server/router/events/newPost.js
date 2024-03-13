const express = require("express");
const authenticate = require("../../middleware/jwt/jwt");
const prePostSchema = require("../../schema/prePostSchema");
const userSchema = require("../../schema/userSchema");

const router = express.Router();

router.use(authenticate);

router.post("/post/check", async (req, res) => {
  const result = await prePostSchema.findOne({ user: req.userId });

  res.status(200).json({ result });
});

router.post("/post/step0", async (req, res) => {
  const { typeWork, city, adresse, phone } = req.body;
  console.log(phone);

  try {
    const result = await userSchema.findById(req.userId);
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }

    const preUser = await prePostSchema.findOne({ user: req.userId });
    if (preUser) {
      // Update the existing prePost entry
      await prePostSchema.findOneAndUpdate(
        { user: req.userId },
        {
          $set: {
            "step0.adresse": adresse,
            "step0.phone": result.phone,
            "step0.city": city,
            "step0.typeWork": typeWork,
            "step0.hiddenPhone": phone,
          },
        }
      );
      console.log("PrePost updated:", preUser);
      return res.status(200).json({ msg: "PrePost updated" });
    } else {
      // Create a new prePost entry
      await prePostSchema.create({
        user: req.userId,
        step0: {
          adresse,
          phone: result.phone,
          city,
          typeWork,
          hiddenPhone: phone,
        },
      });
      console.log("PrePost created");
      return res.status(200).json({ msg: true });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: false });
  }
});

router.post("/post/step1", (req, res) => {
  const { mainCat, subCat, subCat1, title, description } = req.body;
  try {
    prePostSchema
      .findOneAndUpdate(
        { user: req.userId },
        {
          $set: {
            step1: {
              mainCat,
              subCat,
              subCat1,
              title,
              description,
            },
          },
        }
      )
      .then((result) => {
        res.status(200).json({ msg: true });
      });
  } catch (error) {
    res.status(500).json({ msg: false });
  }
});

module.exports = router;
