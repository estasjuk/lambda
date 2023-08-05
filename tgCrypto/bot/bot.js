const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const token = process.env.token;

//const {  } = require('./options');

const bot = new TelegramBot(token, { polling: true });

const help = `Основные команды бота:

- Приветствие - /start
- Список самой хайповой крипты с актуальными ценами - /listRecent
- Подробная информацию про криптовалюту - /{currency_symbol}
- Добавляет крипту в раздел "избранное" - /addToFavourite {currency_symbol}
- Возвращает лист избранной криптовалюты - /listFavourite
- Удаляет крипту из раздела "избранное" - /deleteFavourite {currency_symbol}`;

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Добро пожаловать в бот CryptoBot! \r\n Следи за курсом самой популярной криптовалюты.",
    );
});

bot.onText(/\/help/, async (msg) => {
    bot.sendMessage(msg.chat.id, help);
});

bot.onText(/\/listRecent/, async (msg) => {
    const currencies = await currencyService.getRecentList();
    const resp = prepareListRecent(currencies);
    bot.sendMessage(msg.chat.id, resp);
});