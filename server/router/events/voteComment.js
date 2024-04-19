const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/jwt/jwt");
const userSchema = require("../../schema/userSchema");

router.use(authenticate);

router.post("/comment/:vote/:id", async (req, res) => {
  const { userId } = req;
  const { vote, id } = req.params;
  try {
    const user = await userSchema.findOne({ "comments._id": id });
    if (user) {
      const commentIndex = user.comments.findIndex(
        (comment) => comment._id == id
      );
      if (commentIndex !== -1) {
        const comment = user.comments[commentIndex];

        const existingVoteIndex = comment.vote.findIndex(
          (v) => v.user.toString() === userId
        );

        if (existingVoteIndex !== -1) {
          comment.vote.splice(existingVoteIndex, 1);
          await user.save();
          console.log("Vote removed successfully.");
          res.status(200).json({ message: "Vote removed successfully." });
        } else {
          comment.vote.push({
            user: userId,
            vote: parseInt(vote) === 1,
          });
          await user.save();
          console.log("Vote for the comment updated successfully.");
          res
            .status(200)
            .json({ message: "Vote for the comment updated successfully." });
        }
      } else {
        console.log("Comment not found.");
        res.status(404).json({ error: "Comment not found" });
      }
    } else {
      console.log("User not found for the comment.");
      res.status(404).json({ error: "User not found for the comment" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
