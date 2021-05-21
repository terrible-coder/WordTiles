import { Bot } from "grammy";
require("dotenv").config();

/**
 * The authentication token for the Telegram Bot API.
 * 
 * **MAKE SURE NOT TO MAKE THIS PUBLIC.**
 */
const TG_TOKEN = <string>process.env.TG_TOKEN;

const bot = new Bot(TG_TOKEN);

bot.command("start", ctx => ctx.reply("Welcome to the game player."));
bot.on("message:text", ctx => ctx.reply("Echo: " + ctx.message.text));


bot.start();