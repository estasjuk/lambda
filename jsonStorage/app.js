require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routesRouter = require("./routes/api/routes");

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use("/api", routesRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;