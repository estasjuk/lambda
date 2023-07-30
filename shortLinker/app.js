const express = require('express');
const cors = require('cors');
require("dotenv").config();

const urlRouter = require('./routes/url-routes')

const app = express()

app.use(cors());

app.use(express.json());

app.use('/', urlRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const {status = 500, message = 'Internal Server Error'} = err;
  res.status(status).json({ message })
});

module.exports = app;