const express = require("express");

const app = express();

app.post("/register" , (req, res) => {
  const data = req.body;
})

app.listen(3002, () => {
  console.log("app listening on port 3002");
});
