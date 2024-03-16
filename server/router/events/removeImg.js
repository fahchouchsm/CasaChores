const express = require("express");
const authenticate = require("../../middleware/jwt/jwt");
const prePostSchema = require("../../schema/prePostSchema");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.use(authenticate);

router.delete("/prepost/img/:index", async (req, res) => {
  const { index } = req.params;

  try {
    const result = await prePostSchema.findOne({ user: req.userId });

    if (!result) {
      return res.status(404).json({ error: "Document not found" });
    }

    let { imgUrl } = result.step2;

    const deletedImageUrl = imgUrl.splice(index, 1)[0];

    await prePostSchema.updateOne(
      { user: req.userId },
      { $set: { "step2.imgUrl": imgUrl } }
    );

    if (deletedImageUrl) {
      const imagePath = path.join(
        __dirname,
        "../../uploads/posts",
        deletedImageUrl.split("/").pop()
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`Deleted post image: ${imagePath}`);
      } else {
        console.log(`Post image not found at: ${imagePath}`);
      }
    }

    res.json({ msg: "Image deleted successfully", index });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
