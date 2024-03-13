const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("../../middleware/jwt/jwt");
const sellerSchema = require("../../schema/sellerSchema");
const userSchema = require("../../schema/userSchema");

const router = express.Router();

// router.use(authenticate);

async function usernameAvailable(username) {
  try {
    const foundUserName = await sellerSchema.findOne({ userName: username });
    return !!foundUserName; // Returns true if the username is found, false otherwise
  } catch (error) {
    console.error("Error in isUsernameExists function:", error);
    return false; // Return false in case of an error
  }
}

async function phoneAvailable(userId, phone) {
  try {
    const foundUser = await userSchema.findById(userId);
    return foundUser ? foundUser.phone === phone : false;
  } catch (error) {
    console.error("Error in isPhoneExists function:", error);
    return false;
  }
}

router.post("/userNamePhone", async (req, res) => {
  const { phone, userName, sellerType } = req.body;
  console.log(phone, userName, sellerType);

  const isUserNameAvailable = await usernameAvailable(userName);
  const isPhoneAvailable = await phoneAvailable(req.userId, phone);

  res.status(200).json({
    userName: isUserNameAvailable,
    phone: isPhoneAvailable,
  });
});

module.exports = router;
