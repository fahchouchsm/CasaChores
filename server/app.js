const bodyParser = require("body-parser");
const express = require("express");
const registerRouter = require("./router/auth/register");
const loginRouter = require("./router/auth/login");
const cors = require("cors");
const morgan = require("morgan");
const connection = require("./database/connection");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logedChecking = require("./router/jwt/logedChecking");

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

// ? register
app.use("/", registerRouter);
// ? login
app.use("/", loginRouter);
// ? loged checking
app.use("/", logedChecking);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// * test
app.get("/test", (req, res) => {
  res.send(req.session.user);
});
