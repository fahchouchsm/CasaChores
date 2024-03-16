const express = require("express");
const prePostSchema = require("../../schema/prePostSchema");
const authenticate = require("../../middleware/jwt/jwt");
const postSchema = require("../../schema/postSchema");
const categoryPSchema = require("../../schema/category/categoryPSchema");

const router = express.Router();

router.get("/posts/categorys", async (req, res) => {
  try {
    const catP = await categoryPSchema.find();

    const categoryCountsP = [];

    for (const cat of catP) {
      const count = await postSchema.countDocuments({
        serviceOfred: cat.name,
      });

      categoryCountsP.push({
        name: cat.name,
        sub: cat.subCategory.map((sub) => {
          return sub.name;
        }),
        num: count,
      });
    }

    res.json({ catP: categoryCountsP });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/posts/:search/:type/:city?", async (req, res) => {
  try {
    let { city, type } = req.params;
    if (city) {
      city = city.charAt(0).toUpperCase() + city.slice(1);
    }

    const query = {};
    if (city) {
      query.city = city;
    }

    const posts = await postSchema
      .find(query)
      .populate({
        path: "user",
        select: "name lastName userRating reviews pfpLink",
      })
      .populate("seller");

    res.json({ res: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postSchema
      .findById(id)
      .populate({
        path: "user",
        select: "name lastName userRating reviews pfpLink userName reviews",
      })
      .populate({
        path: "seller",
        select: "bio userName sellerType userName",
      });
    res.json({ post: result });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
});

router.get("/prepost/imgs", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    prePostSchema.findOne({ user: userId }).then((result) => {
      res.status(200).json({ msg: result.step2.imgUrl });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
