const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const grid = require("gridfs-stream");

const getCategories = require("./router/events/getCategories");
const registerRouter = require("./router/auth/register");
const logedChecking = require("./middleware/jwt/logedChecking");
const userSettings = require("./router/events/userSettings");
const loginRouter = require("./router/auth/login");
const logoutRouter = require("./router/auth/logout");
const uploadRouter = require("./router/events/imgUpload");
const connection = require("./database/connection");

const app = express();

const port = 3001;
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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(morgan(":method :url :status - :response-time ms"));
app.use(sessionMiddleware);

app.use("/uploads", express.static("uploads"));

// ?
app.use("/getcategories", getCategories);
// ? register
app.use("/", registerRouter);
// ? login
app.use("/", loginRouter);
// ? logout
app.use("/logout", logoutRouter);
// ? loged checking
app.use("/jwt", logedChecking);
// ? user settings
app.use("/usersettings", userSettings);
//  ? uploads
app.use("/upload", uploadRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
// !!

// * test
const mongoose = require("mongoose");
const postsSchema = require("./schema/postSchema");
const userSchema = require("./schema/userSchema");
const postSchema = require("./schema/postSchema");

app.get("/test", (req, res) => {
  // res.send(req.session.user);
  // insertData();
  // userSchema.findById("659269931ef3009a162df5cf").then((result) => {
  //   const post = new postSchema({
  //     title: "repearing sealling",
  //     description:
  //       "Minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  //     location: "Agadir",
  //     contactInfo: {
  //       email: "dounix@gmail.com",
  //       phone: "+212600422374",
  //     },
  //     user: result._id,
  //   });
  //   post.save().then((savedPost) => {
  //     result.posts.push(savedPost._id);
  //     result.save().then((userPostResut) => {
  //       res.send(userPostResut);
  //     });
  //   });
  // });
});
