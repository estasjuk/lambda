const express = require('express');
require("dotenv").config();

const cryptoRouter = require('./routes/cryptoRoutes');

const app = express();

app.use(express.json());

app.use('/', cryptoRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Internal Server Error' } = err;
    res.status(status).json({ message })
});

module.exports = app;