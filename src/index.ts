import { Bot } from "grammy";
require("dotenv").config();

import { command_list } from "./core.bot/commands";

/**
 * The authentication token for the Telegram Bot API.
 * 
 * **MAKE SURE NOT TO MAKE THIS PUBLIC.**
 */
const TG_TOKEN = <string>process.env.TG_TOKEN;

const bot = new Bot(TG_TOKEN);

(async () => {
	await bot.api.setMyCommands(Object.keys(command_list).map(command => {
		return {
			command: command,
			description: command_list[command].desc
		}
	}));
})();

Object.keys(command_list).forEach(command => {
	bot.command(command, ctx => {
		const message = command_list[command].message;
		message.forEach(msg => ctx.reply(msg));
	});
});

bot.command("start", ctx => ctx.reply("Welcome to the game player."));
bot.on("message:text", ctx => ctx.reply("Echo: " + ctx.message.text));


bot.start();
console.log("bot online");