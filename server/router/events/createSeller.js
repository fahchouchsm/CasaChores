const express = require("express");
const userSchema = require("../../schema/userSchema");
const sellerSchema = require("../../schema/sellerSchema");
const authenticated = require("../../middleware/jwt/jwt");

const router = express.Router();

router.use(authenticated);

router.post("/seller/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { userName, sellerType, whatsappLink } = req.body;
    if (!userName || !sellerType || !whatsappLink) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body." });
    }
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.seller) {
      return res.status(400).json({ error: "User is already a seller." });
    }
    const newSeller = new sellerSchema({
      userId: user._id,
      sellerType,
      userName,
      whatsappLink,
    });
    const savedSeller = await newSeller.save();
    user.seller = true;
    await user.save();
    res.json({ message: "Seller created successfully.", seller: savedSeller });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error.", details: error.message });
  }
});

module.exports = router;
