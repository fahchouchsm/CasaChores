const express = require("express");
const prePostSchema = require("../../schema/prePostSchema");
const authenticate = require("../../middleware/jwt/jwt");
const postSchema = require("../../schema/postSchema");
const categoryPSchema = require("../../schema/category/categoryPSchema");
const userSchema = require("../../schema/userSchema");

const router = express.Router();
router.post("/posts/:search?", async (req, res) => {
  try {
    const { search } = req.params;
    const { city, selCat } = req.body;
    console.log(selCat);
    let posts = [];
    let users = [];

    if (!search || search.trim() === "") {
      let query = {};

      if (selCat) {
        query.serviceOfred = selCat;
      }

      if (city) {
        query.city = { $regex: city, $options: "i" };
      }

      posts = await postSchema
        .find(query)
        .populate("user", "name lastName pfpLink userRating");
    } else {
      const postQuery = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { serviceOfred: { $regex: search, $options: "i" } },
        ],
      };

      if (selCat) {
        postQuery.serviceOfred = selCat;
      }

      if (city) {
        postQuery.city = { $regex: city, $options: "i" };
      }

      posts = await postSchema
        .find(postQuery)
        .populate("user", "name lastName pfpLink userRating");
    }

    res.json({ response: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postSchema
      .findById(id)
      .populate({
        path: "user",
        select: "name lastName userRating comments pfpLink userName",
        populate: {
          path: "comments.user",
          select: "name lastName pfpLink userName",
        },
      })
      .populate({
        path: "seller",
        select: "bio userName sellerType",
      });
    res.json({ post: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
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
