const TelegramBot = require('node-telegram-bot-api');
const { program } = require('commander');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.token;
const chatId = process.env.chatId;

const bot = new TelegramBot(token, { polling: true })
program.version('1.0.0');

program
    .command('message')
    .description('send message')
    .alias('m')
    .argument('<message>')
    .action(async (msg) => {
        await bot.sendMessage(chatId, msg);
        process.exit(0);
    }
  );

program
  .command('photo')
  .description('send photo')
  .alias('p')
  .argument('<path>')
  .action(async (photo) => {
      await bot.sendPhoto(chatId, photo);
      process.exit(0);
  });

program
  .option('-m, --message', 'for sending message')
  .option('-p, --photo', 'for sending photo')
  .action(task => {
    console.log(`${task}`);
  });

program.parse();