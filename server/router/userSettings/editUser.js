const express = require("express");
const userSchema = require("../../schema/userSchema");
const authenticate = require("../../middleware/jwt/jwt");

const router = express.Router();

router.use(authenticate);

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, phone } = req.body;

    console.log(name, lastName, email, phone);

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const existingUser = await userSchema.findById(id);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.email !== email) {
      existingUser.email = email;
      existingUser.verifiedEmail = false;
    }

    existingUser.name = name;
    existingUser.lastName = lastName;
    existingUser.phone = phone;

    const updatedUser = await existingUser.save();

    res.json({
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
