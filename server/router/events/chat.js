const express = require("express");
const authenticate = require("../../middleware/jwt/jwt");
const chatSchema = require("../../schema/chatSchema");
const userSchema = require("../../schema/userSchema");
const postSchema = require("../../schema/postSchema");
const router = express.Router();

router.use(authenticate);
router.post("/get/history", async (req, res) => {
  try {
    const { userId } = req;

    const chats = await chatSchema
      .find({ participants: userId })
      .populate({
        path: "participants",
        select: "name lastName pfpLink",
      })
      .populate({
        path: "messages.sender",
        select: "name lastName",
      })
      .sort("-messages.timestamp")
      .lean()
      .exec();

    const chatsWithLastMessage = chats.map((chat) => {
      const lastMessage =
        chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1]
          : null;
      return {
        participants: chat.participants,
        lastMessage: lastMessage,
      };
    });

    res.status(200).json({ chats: chatsWithLastMessage });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/users/:search", async (req, res) => {
  const { search } = req.params;
  const { userId } = req;

  try {
    const users = await userSchema
      .find({
        $and: [
          {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { lastName: { $regex: search, $options: "i" } },
            ],
          },
          { _id: { $ne: userId } },
        ],
      })
      .select("name lastName pfpLink")
      .lean();

    const usersWithChatsAndPosts = await Promise.all(
      users.map(async (user) => {
        const lastChat = await chatSchema
          .findOne({ participants: user._id })
          .sort({ "messages.timestamp": -1 })
          .populate({
            path: "messages.sender",
            select: "name lastName",
          })
          .lean();

        const firstPost = await postSchema
          .findOne({ user: user._id })
          .sort("createdAt")
          .lean();

        return {
          ...user,
          lastChat,
          firstPost,
        };
      })
    );

    res.json(usersWithChatsAndPosts);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userSchema
      .findById(id)
      .select("name lastName pfpLink")
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const lastChat = await chatSchema
      .findOne({ participants: user._id })
      .sort({ "messages.timestamp": -1 })
      .populate({
        path: "messages.sender",
        select: "name lastName",
      })
      .lean();

    const firstPost = await postSchema
      .findOne({ user: user._id })
      .sort("createdAt")
      .lean();

    res.json({ user, lastChat, firstPost });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/send/msg", async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.userId;
    console.log(content);

    let chat = await chatSchema.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!chat) {
      chat = new chatSchema({
        participants: [senderId, recipientId],
        messages: [],
      });
    }

    const message = {
      sender: senderId,
      content: content,
      timestamp: Date.now(),
    };

    chat.messages.push(message);

    await chat.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/history/:user", async (req, res) => {
  const { user } = req.params;
  const { userId: authenticatedUserId } = req;

  try {
    const chat = await chatSchema
      .findOne({
        participants: { $all: [authenticatedUserId, user] },
      })
      .populate({
        path: "messages.sender",
        select: "name lastName",
      })
      .sort({ "messages.timestamp": 1 })
      .lean();

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
