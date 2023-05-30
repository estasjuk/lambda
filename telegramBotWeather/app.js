const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();


const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const convertKelvinToCelsius = (kelvin) => {
    celsius = Math.round(kelvin - 273);
};
