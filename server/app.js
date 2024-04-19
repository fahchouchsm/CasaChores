const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const userNameChecker = require("./router/events/userNameChecker");
const getCategories = require("./router/events/getCategory");
const getCity = require("./router/events/getCity");
const getImg = require("./router/post/getPost");
const removeImg = require("./router/events/removeImg");
const registerRouter = require("./router/auth/register");
const createSellerRouter = require("./router/events/createSeller");
const newPost = require("./router/events/newPost");
const newComment = require("./router/events/newComment");
const voteComment = require("./router/events/voteComment");
const logedChecking = require("./middleware/jwt/logedChecking");
const wsChecker = require("./bot/wsCheck");
const userSettings = require("./router/userSettings/userSettings");
const editUser = require("./router/userSettings/editUser");
const loginRouter = require("./router/auth/login");
const logoutRouter = require("./router/auth/logout");
const uploadRouter = require("./router/events/imgUpload");
const chatRouter = require("./router/events/chat");

const connection = require("./database/connection");

const app = express();
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT;
const sessionMiddleware = session({
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan(":method :url :status - :response-time ms"));
app.use(sessionMiddleware);

app.use("/uploads", express.static("uploads"));

app.use("/check", userNameChecker);
app.use("/get", getCategories);
app.use("/get", getCity);
app.use("/get", getImg);
app.use("/remove", removeImg);
app.use("/register", registerRouter);
app.use("/new", createSellerRouter);
app.use("/new", newPost);
app.use("/vote", voteComment);
app.use("/new", newComment);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/jwt", logedChecking);
app.use("/ws", wsChecker);
app.use("/usersettings", userSettings);
app.use("/edit/user", editUser);
app.use("/upload", uploadRouter);
app.use("/chat", chatRouter);

const userSchema = require("./schema/userSchema");
app.get("/test", async (req, res) => {
  const result = await userSchema.find();
  console.log(result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
