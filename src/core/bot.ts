import { Bot } from "grammy";
require("dotenv").config();

import { command_list } from "./commands";

/**
 * The authentication token for the Telegram Bot API.
 * 
 * **MAKE SURE NOT TO MAKE THIS PUBLIC.**
 */
const TG_TOKEN = <string>process.env.TG_TOKEN;

export const bot = new Bot(TG_TOKEN);

(async () => {
	await bot.api.setMyCommands(Object.keys(command_list).map(command => {
		return {
			command: command,
			description: command_list[command].desc
		}
	}));
})();

Object.keys(command_list).forEach(command => {
	bot.command(command, command_list[command].res);
});

bot.on("message:text", ctx => ctx.reply("Echo: " + ctx.message.text));

bot.start();
console.log("bot online");