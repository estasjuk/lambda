const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/auth-routes");

const app = express();

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"],
}));
app.use(express.json());
app.use("/", router);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;