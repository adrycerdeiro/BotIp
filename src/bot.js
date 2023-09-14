import axios from "axios";
import { Telegraf } from "telegraf";

const ALLOWED_USERS = process.env.ALLOWED_USERS.split(',').map((id) => parseInt(id))

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
    ctx.reply('Something went wrong 🫠');
});

bot.use(async (ctx, next) => {
    if (!ALLOWED_USERS.includes(ctx.update.message.from.id)) {
        ctx.reply('You are not allowed to use this bot!');
        return;
    }
    await next();
})

bot.start((ctx) => ctx.reply('Welcome! I\'m a bot!'));

bot.command('ip', async (ctx) => {
    const response = await axios.get('https://api.ipify.org?format=json')
    ctx.reply(`This is your ip: ${response.data.ip}`);
});

const initBot = async () => await bot.launch();

export {
    initBot,
};