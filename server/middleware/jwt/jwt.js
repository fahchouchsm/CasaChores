// jwt.js
const jwt = require("jsonwebtoken");
const userSchema = require("../../schema/userSchema");

require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req.cookies.rem;

  if (!token) {
    console.log("No token");
    return res.status(401).json({ message: "No token" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.KEY);

    // Check if user exists
    const foundUser = await userSchema.findById(decoded.id);
    if (!foundUser) {
      console.log("User not found");
      return res.status(401).json({ message: "User not found" });
    }

    // Store user ID in request for further processing
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
