const express = require('express');
const cors = require('cors');

const orderRouter = require('./routes/api/order-routes')

const app = express()

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"],
}));

app.use(express.json())

app.use('/api/order', orderRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Internal Server Error'} = err;
  res.status(status).json({ message })
})

module.exports = app;