const express = require("express");
const { db } = require("./db");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json({ limit: "50mb" }));
// const multer = require('multer')
// const upload = multer()
db();
app.get("/", (req, res) => {
  res.send("Welcome to project");
});


app.listen(port, () => {
  console.log("connected to port " + port);
});
