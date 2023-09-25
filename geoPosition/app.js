const express = require('express');

require('dotenv').config();
const ngrok = require('ngrok');

const { formatIp, searchIp } = require('./services');
const { PORT, NGROK_TOKEN } = process.env
const app = express();

const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log('Server is running...');
    });
    const url = await ngrok.connect({
      addr: PORT,
      authtoken: NGROK_TOKEN,
    });
    console.log('ngrok URL:', url);
  }
  catch (err) {
    console.log(err);
  }
}

app.set('trust proxy', true);

app.get('/', (req, res) => {
  const ip = formatIp(req.ip);
  const object = searchIp(ip);
  console.log({
    IP: ip,
    countryCode: object.code,
    country: object.country,
});
  res.json({
    IP: ip,
    countryCode: object.code,
    country: object.country,
})
});

server();