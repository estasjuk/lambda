const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose')
require("dotenv").config();
const token = process.env.token;
const { User } = require('./models/users');
const { createCurrencyInterface, getDetailInfo } = require('./services');
const { addToFavorite, deleteFromFavorite } = require('./options');
const {DB_HOST} = process.env;


mongoose.connect(DB_HOST)
.then(console.log("Database connection successful"))
.catch(error => {
    console.log(error.message);
    process.exit(1);
});

const bot = new TelegramBot(token, { polling: true });


const help = `Основные команды бота:

- Приветствие - /start
- Список самой хайповой крипты с актуальными ценами - /listRecent
- Подробная информацию про криптовалюту - /{currency_symbol}
- Добавляет крипту в раздел "избранное" - /addToFavorite {currency_symbol}
- Возвращает лист избранной криптовалюты - /listFavorite
- Удаляет крипту из раздела "избранное" - /deleteFavorite {currency_symbol}`;

const timeRanges = `
Пожалуйста, выберите временной интервал (часы) для просмотра истории изменения цены: \n
/0_5
/1
/3
/6
/12
/24
`

let symbol = "";

bot.onText(/\/start/, async (msg) => {
    const user = await User.findOne({ chatId: msg.chat.id });
    if (!user) {
        await User.create({chatId: msg.chat.id, name: msg.chat.first_name});
    }
    bot.sendMessage(
        msg.chat.id,
        'Добро пожаловать в бот Crypto!\nСледи за курсом самой популярной криптовалюты.',
    );
});

bot.onText(/\/help/, async (msg) => {
    bot.sendMessage(msg.chat.id, help);
});

bot.onText(/\/listRecent/, async (msg) => {
    const list = await createCurrencyInterface();
    bot.sendMessage(msg.chat.id, list);
});

bot.onText(/\/[A-Z]{3,4}/, async (msg) => {
    symbol = msg.text.slice(1, msg.text.length);
    bot.sendMessage(msg.chat.id, timeRanges);
    return symbol;
});

bot.onText(/\/[_0-9]{1,4}/, async (msg) => {
    const time = msg.text.slice(1, msg.text.length)+"h";
    console.log(time);
    const detailInfo = await getDetailInfo(time, symbol);
    const user = await User.findOne({chatId: msg.chat.id});
    if (user.favorite_coins.includes(symbol)) {
        bot.sendMessage(msg.chat.id, detailInfo, deleteFromFavorite);
    } else 
        bot.sendMessage(msg.chat.id, detailInfo, addToFavorite);
});

bot.onText(/Add to favorite/, async (msg) => {
    await User.findOneAndUpdate({chatId: msg.chat.id}, {$addToSet: { favorite_coins: symbol }} );
    bot.sendMessage(msg.chat.id, `Валюта ${symbol} добавлена в "Избранное"`, deleteFromFavorite);
});

bot.onText(/Delete from favorite/, async (msg) => {
    await User.findOneAndUpdate({chatId: msg.chat.id}, {$pull: { favorite_coins: symbol }} );
    bot.sendMessage(msg.chat.id, `Валюта ${symbol} удалена из "Избранного"`, addToFavorite);
});

bot.onText(/\/listFavorite/, async (msg) => {
    const user = await User.findOne({chatId: msg.chat.id}).populate("favorite_coins");
    const list = user.favorite_coins.map(coin => `/${coin}\n`).join().replace(/,/g, '');
    bot.sendMessage(msg.chat.id, list);
});