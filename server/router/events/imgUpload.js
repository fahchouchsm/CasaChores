const express = require("express");
const multer = require("multer");
const userSchema = require("../../schema/userSchema");
const prePostSchema = require("../../schema/prePostSchema");
const authentication = require("../../middleware/jwt/jwt");
const router = express.Router();

const dirStorage = (dir) => {
  return multer.diskStorage({
    destination: `uploads/${dir}`,
    filename: (req, file, cb) => {
      const userId = req.query.userId;

      if (!userId) {
        return cb(new Error("UserId is not defined"), null);
      }

      const currentDate = new Date().toISOString().replace(/:/g, "-");
      cb(null, `${userId}-${currentDate}-PFP-${file.originalname}`);
    },
  });
};

router.use(authentication);

const uploadPfp = multer({ storage: dirStorage("pfp") });

router.post("/user/pfp", uploadPfp.single("image"), async (req, res) => {
  if (req.file) {
    const imageUrl = `${req.protocol}:
      req.file.filename
    }?v=${Date.now()}`;
    await userSchema
      .findOneAndUpdate(
        { _id: req.query.userId },
        { $set: { pfpLink: imageUrl } },
        { new: true }
      )
      .then((result) => {
        res.status(201).json({ result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res
      .status(400)
      .json({ error: "No file uploaded or upload error occurred" });
  }
});

const uploadPost = multer({ storage: dirStorage("posts") });

router.post("/user/post", uploadPost.array("images", 5), async (req, res) => {
  const userId = req.userId;

  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Validate userId in the request query
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Extract image URLs from uploaded files
    const imgUrls = req.files.map(
      (file) => `${req.protocol}://${req.hostname}/${file.filename}`
    );

    // Retrieve existing user post data
    const prePost = await prePostSchema.findOne({ user: userId });
    const currentImgCount = prePost ? prePost.step2.imgUrl.length : 0;

    // Calculate remaining image slots and add new images
    const remainingSlots = 8 - currentImgCount;
    const imgsToAdd = imgUrls.slice(0, remainingSlots);

    // Update post with new image URLs
    const updatedPost = await prePostSchema.findOneAndUpdate(
      { user: userId },
      { $push: { "step2.imgUrl": { $each: imgsToAdd, $slice: -8 } } },
      { new: true }
    );

    // Respond with updated image URLs
    res.status(201).json({ imgUrls: updatedPost.step2.imgUrl });
  } catch (err) {
    console.error("Error in /user/post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
