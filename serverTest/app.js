const express = require("express");
const app = express();

const connection = require("./connection");
const userSchema = require("./userSchema");

const morgan = require("morgan");

app.use(morgan(":method :url :status - :response-time ms"));

app.get("/", async (req, res) => {
  // const result = await userSchema.find();

  res.json("hello");
});

const port = 3004;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
