const express = require("express");
const authenticate = require("../../middleware/jwt/jwt");
const userSchema = require("../../schema/userSchema");

const router = express.Router();

router.use(authenticate);

router.post("/:categorie/:setting", async (req, res) => {
  try {
    const { categorie, setting } = req.params;
    const result = await userSchema.findById(req.userId);

    const value = result.settings[categorie][setting];

    const updatedUser = await userSchema.findByIdAndUpdate(
      req.userId,
      { $set: { [`settings.${categorie}.${setting}`]: !value } },
      { new: true }
    );

    const response = await userSchema.findById(req.userId).select("settings");

    res.status(200).json({ settingsData: response.settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user settings
router.get("/", async (req, res) => {
  try {
    const response = await userSchema.findById(req.userId).select("settings");

    res.status(200).json({ settingsData: response.settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
