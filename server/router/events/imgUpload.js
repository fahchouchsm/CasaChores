const express = require("express");
const multer = require("multer");
const userSchema = require("../../schema/userSchema");
const prePostSchema = require("../../schema/prePostSchema");
const authenticate = require("../../middleware/jwt/jwt");
const fs = require("fs");

const router = express.Router();

router.use(authenticate);

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

const uploadPfp = multer({ storage: dirStorage("pfp") });
router.post("/user/pfp", uploadPfp.single("image"), async (req, res) => {
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/pfp/${
      req.file.filename
    }`;
    try {
      const currentLink = await userSchema.findById(req.userId);

      if (
        currentLink.pfpLink !== "http://localhost:3001/uploads/pfp/default.png"
      ) {
        const p = currentLink.pfpLink;
        const pPath = p.split("/").pop();
        const imagePath = `uploads/pfp/${pPath}`;

        // Delete the previous profile picture
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted profile picture: ${imagePath}`);
        } else {
          console.log(`Profile picture not found at: ${imagePath}`);
        }
      }

      // Update the user's profile picture link
      const updatedUser = await userSchema.findOneAndUpdate(
        { _id: req.userId },
        { $set: { pfpLink: imageUrl } },
        { new: true }
      );

      res.status(201).json({ result: updatedUser });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res
      .status(400)
      .json({ error: "No file uploaded or upload error occurred" });
  }
});

const uploadPost = multer({ storage: dirStorage("posts") });

router.post("/user/post", uploadPost.array("images", 8), async (req, res) => {
  try {
    const imgUrls = [];
    req.files.forEach((file) => {
      imgUrls.push(
        `${req.protocol}://${req.get("host")}/uploads/posts/${file.filename}`
      );
    });
    const updateResult = await prePostSchema.findOneAndUpdate(
      { user: req.userId },
      { $push: { "step2.imgUrl": { $each: imgUrls } } },
      { new: true }
    );
    console.log(imgUrls);
    res.status(200).send();
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
