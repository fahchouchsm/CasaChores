const express = require("express");
const prePostSchema = require("../../schema/prePostSchema");
const authenticate = require("../../middleware/jwt/jwt");

const router = express.Router();

router.use(authenticate);

router.get("/prepost/imgs", async (req, res) => {
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
