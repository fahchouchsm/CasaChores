const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const userSchema = require("../../schema/userSchema");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/pfp",
  filename: (req, file, cb) => {
    const userId = req.query.userId;

    if (!userId) {
      return cb(new Error("UserId is not defined"), null);
    }

    const currentDate = new Date().toISOString().replace(/:/g, "-");
    cb(null, `${userId}-${currentDate}-PFP-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/user/pfp", upload.single("image"), async (req, res) => {
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/pfp/${
      req.file.filename
    }?v=${Date.now()}`;
    await userSchema
      .findOneAndUpdate(
        { _id: req.query.userId },
        { $set: { pfpLink: imageUrl } },
        { new: true } // to return the updated document
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

module.exports = router;
