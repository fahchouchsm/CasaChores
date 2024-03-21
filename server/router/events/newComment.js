const experess = require("express");
const authenticate = require("../../middleware/jwt/jwt");
const userSchema = require("../../schema/userSchema");
const postSchema = require("../../schema/postSchema");
const router = experess.Router();

router.use(authenticate);

router.post("/comment", async (req, res) => {
  const userId = req.userId;
  const { comment, idPostUser } = req.body;

  try {
    const userPost = await userSchema.findById(idPostUser);
    const commentObj = {
      user: userId,
      comment,
    };
    userPost.comments.push(commentObj);
    await userPost.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
