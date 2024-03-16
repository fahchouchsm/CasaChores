const express = require("express");
const authenticate = require("../../middleware/jwt/jwt");
const prePostSchema = require("../../schema/prePostSchema");
const userSchema = require("../../schema/userSchema");
const postSchema = require("../../schema/postSchema");
const sellerSchema = require("../../schema/sellerSchema");
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

router.post("/post/step2", async (req, res) => {
  try {
    const { imgs, favIndex } = req.body;
    const imgUrls = imgs.map((img) => img.value);
    await prePostSchema.findOneAndUpdate(
      { user: req.userId },
      {
        $set: {
          "step2.imgUrl": imgUrls,
          "step2.favIndex": favIndex,
        },
      }
    );
    res.json({ msg: true });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/post/step3", async (req, res) => {
  try {
    const preResult = await prePostSchema.findOne({ user: req.userId });

    if (!preResult) {
      return res.status(404).json({ message: "PrePost not found" });
    }
    const { step0, step1, step2, user } = preResult;

    const seller = await sellerSchema.findOne({ userId: user });

    if (
      !step1 ||
      !step2 ||
      !step0.city ||
      !step1.title ||
      !step1.description ||
      !step2.imgUrl ||
      step2.imgUrl.length === 0
    ) {
      return res.status(400).json({ message: "Invalid preResult data" });
    }
    const newPost = new postSchema({
      title: step1.title,
      description: step1.description,
      location: step0.city,
      serviceOfred: [step1.mainCat, step1.subCat, step1.subCat1].filter(
        Boolean
      ),
      phone: step0.phone,
      city: step0.city,
      images: step2.imgUrl,
      favImg: step2.favIndex || 0,
      user: user,
      seller: seller._id,
    });
    await preResult.deleteOne();
    console.log("PreResult document deleted successfully.");
    await newPost.save();
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/post/prePost", async (req, res) => {
  const result = await prePostSchema.findOne({ user: req.userId });

  res.json({ msg: result });
});

module.exports = router;
