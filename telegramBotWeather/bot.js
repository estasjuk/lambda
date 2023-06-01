const TelegramBot = require('node-telegram-bot-api');
// const dotenv = require('dotenv');
// dotenv.config();
const token = '6253421458:AAHlvAQnCAsEAbGDbyTr1CFTNBNkyKnrFe8';
//const options = require('./options');

const { createForecastInterface} = require('./app');
const { startMenu, weather } = require('./options');
//const { token, chatId } = process.env;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome, please, use provided buttons",
    startMenu
  );
});

bot.onText(/Weather Forecast in Munich/, (msg) => {
   const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Please, choose the interval", weather);
});

bot.onText(/Every 3 hours/, async (msg) => {
    const chatId = msg.chat.id;
  const text = await createForecastInterface();
  bot.sendMessage(chatId, text, weather);
});

bot.onText(/Every 6 hours/, async (msg) => {
    const chatId = msg.chat.id;
    const weather = await createForecastInterface();
    const text = weather.filter((w, i) => i % 2 === 0);
    
  bot.sendMessage(chatId, text, options.weather);
});