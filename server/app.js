const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const userNameChecker = require("./router/events/userNameChecker");
const getCategories = require("./router/events/getCategories");
const getCity = require("./router/events/getCity");
const registerRouter = require("./router/auth/register");
const createSellerRouter = require("./router/events/createSeller");
const logedChecking = require("./middleware/jwt/logedChecking");
const wsChecker = require("./bot/wsCheck");
const userSettings = require("./router/userSettings/userSettings");
const editUser = require("./router/userSettings/editUser");
const loginRouter = require("./router/auth/login");
const logoutRouter = require("./router/auth/logout");
const uploadRouter = require("./router/events/imgUpload");

const connection = require("./database/connection");

const app = express();
require("dotenv").config();

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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(morgan(":method :url :status - :response-time ms"));
app.use(sessionMiddleware);

app.use("/uploads", express.static("uploads"));

// ? userName checker
app.use("/check", userNameChecker);
// ? get categories
app.use("/get", getCategories);
// ? get city's
app.use("/get", getCity);
// ? register
app.use("/register", registerRouter);
// ? create seller
app.use("/new", createSellerRouter);
// ? login
app.use("/login", loginRouter);
// ? logout
app.use("/logout", logoutRouter);
// ? loged checking
app.use("/jwt", logedChecking);
// ? ws Check
app.use("/ws", wsChecker);
// ? user settings
app.use("/usersettings", userSettings);
// ? edit user
app.use("/edit/user", editUser);
//  ? uploads
app.use("/upload", uploadRouter);

// * test
const ws = require("./schema/wsCodeSchema");
app.get("/test", async (req, res) => {
  const newWsCode = new ws({
    userId: "someUserId",
    code: "someVerificationCode",
  });
  newWsCode
    .save()
    .then((result) => {
      console.log("WsCode document inserted successfully");
      res.json({ result });
    })
    .catch((error) => {
      console.error("Error inserting WsCode document:", error);
    });
});

// !!
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
