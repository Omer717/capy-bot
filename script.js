const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const welcomeText = "Hello, Welcome to capy-bot! \n This bot makes your day better!";
const CAPYBARA_IMAGE_API_URL = "https://api.capy.lol";
const CAPYBARA_FACT_API_URL = "https://api.capybara-api.xyz";

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(welcomeText));
bot.command('capybara',ctx => ctx.replyWithPhoto({ url: `${CAPYBARA_IMAGE_API_URL}/v1/capybara`}));
bot.command('fact', ctx => {
    axios.get(`${CAPYBARA_FACT_API_URL}/v1/facts/random`)
    .then(res => ctx.reply(res.data.fact))
    .catch(err  => ctx.reply('Researching Capybaras....'));
});
bot.command('test', ctx => console.log(ctx.update.message.from));
bot.launch();

console.log('Bot Running...');

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))