const TelegramBot = require('node-telegram-bot-api');
const token = '6253421458:AAHlvAQnCAsEAbGDbyTr1CFTNBNkyKnrFe8';

const { createForecastInterfaceForThree, createForecastInterfaceForSix, createPrivatExchangeInterface, createMonoExchangeInterface} = require('./app');
const { startMenu, weather, currency } = require('./options');

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Choose option: Weather forecast or Currency exchange",
    startMenu
  );
});

bot.onText(/Weather Forecast in Munich/, (msg) => {
   const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Please, choose the interval", weather);
});

bot.onText(/Every 3 hours/, async (msg) => {
  const text = await createForecastInterfaceForThree();
  bot.sendMessage(msg.chat.id, text, weather);
});

bot.onText(/Every 6 hours/, async (msg) => {
  const text = await createForecastInterfaceForSix();
  bot.sendMessage(msg.chat.id, text, weather);
});

bot.onText(/Currency exchange/, (msg) => {
   const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Please, choose the bank", currency);
});

bot.onText(/Privat/, async (msg) => {
  const text = await createPrivatExchangeInterface();
  bot.sendMessage(msg.chat.id, text, weather);
});

bot.onText(/Mono/, async (msg) => {
  const text = await createMonoExchangeInterface();
  bot.sendMessage(msg.chat.id, text, weather);
});

bot.onText(/Back/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Choose option: Weather forecast or Currency exchange",
    startMenu
  );
});