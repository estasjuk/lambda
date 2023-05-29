const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const { token, chatId } = process.env;
const IMG_URL = 'https://picsum.photos/200/300';

const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/start/, async () => {
  await bot.sendMessage(
    chatId,
    'If you want to receive photo - send "/photo"'
  );
 });

bot.onText(/\photo/, async () => {
  await axios
    .get(IMG_URL)
    .then(response => bot.sendPhoto(chatId, response.request.res.responseUrl));
});

bot.on('message', (msg) => {
  if (msg.text === 'photo') {
    console.log('Send the random photo to user');
  } else {
    console.log('User sent you a message:', msg.text);
  }
});