import { Bot, InlineKeyboard } from "grammy";
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
	bot.command(command, ctx => {
		const message = command_list[command].message;
		message.forEach(msg => ctx.reply(msg));
	});
});


const game_menu = new InlineKeyboard()
					.text("New game", "new_game").row()
					.text("Player stats", "stats");

const new_game = new InlineKeyboard()
					.text("One v One", "1v1").row()
					.text("<< Back", "new_game_back");

(async () => {
	await bot.api.setMyCommands([{
		command: "game",
		description: "Game menu"
	}])
})();

bot.command("game", ctx => ctx.reply("Game menu", {
	reply_markup: game_menu
}));

bot.callbackQuery("new_game", ctx => ctx.reply("Start new game", {
	reply_markup: new_game
}));

bot.callbackQuery("stats", ctx => ctx.reply("fetch player data"));

bot.callbackQuery("1v1", () => {
	// start new game
});

bot.callbackQuery("new_game_back", ctx => ctx.reply("Game menu", {
	reply_markup: new_game
}));


bot.on("message:text", ctx => ctx.reply("Echo: " + ctx.message.text));

bot.start();
console.log("bot online");