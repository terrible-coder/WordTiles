import { InlineKeyboard } from "grammy";
import { bot } from "./bot"

// export type Menu = {
// 	[key: string]: {
// 		text: string,
// 		children?: Menu
// 	}
// }

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
	reply_markup: game_menu
}));
