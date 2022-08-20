const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const flags = {
    feedback_message: 0
}

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
bot.command('send_feedback', ctx => {
    flags.feedback_message = 1;
    ctx.reply('Listening To Feedback :)');
});
bot.on('message', ctx => {
    if (flags.feedback_message) {
        ctx.forwardMessage(process.env.ADMIN_ID);
        flags.feedback_message = 0;
    }
})
bot.launch();

console.log('Bot Running...');

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))