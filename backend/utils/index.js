const express = require("express");
const { db } = require("./db");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(express.json({ limit: "50mb" }));
db();
app.use('/api', require('../routes/register'));
app.use('/api/company', require('../routes/company'));

app.get("/", (req, res) => {
  res.send("Welcome to project");
});


app.listen(port, () => {
  console.log("connected to port " + port);
});
