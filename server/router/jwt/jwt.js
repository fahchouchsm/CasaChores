// jwt.js
const jwt = require("jsonwebtoken");
const userSchema = require("../../schema/UserSchema");

require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req.cookies.rem;

  if (!token) {
    console.log("No token");
    return res.status(401).json({ message: "No token" });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.KEY, async (err, decoded) => {
    if (err) {
      console.log("Invalid token");
      return res.status(403).json({ message: "Invalid token" });
    }

    // Check the session
    try {
      const foundUser = await userSchema.findOne({ _id: decoded.id });
      if (!foundUser) {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }

      // Check if the session exists (pass req.session as a parameter)
      if (
        !req.session ||
        !req.session.user ||
        req.session.user.id !== foundUser._id.toString()
      ) {
        console.log("Invalid session");
        return res.status(401).json({ message: "Invalid session" });
      }

      // All checks passed, store user data in the request
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error("Error checking session:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

module.exports = authenticate;
