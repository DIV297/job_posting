const express = require("express");
const { db } = require("./utils/db");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.options('*', cors()); // Enable pre-flight across-the-board

// CORS configuration
app.use(cors());
db();
app.use('/api', require('./routes/register'));
app.use('/api/company', require('./routes/company'));

app.get("/", (req, res) => {
  res.send("Welcome to project");
});

app.listen(port, () => {
  console.log("connected to port " + port);
});
