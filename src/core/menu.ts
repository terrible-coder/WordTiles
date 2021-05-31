import { Context, InlineKeyboard } from "grammy";

export const menu = {
	game_menu: new InlineKeyboard()
					.text("New game", "new_game").row()
					.text("Player stats", "stats"),

	new_game: new InlineKeyboard()
					.text("One v One", "1v1").row()
					.text("<< Back", "new_game_back")
};

export const callbacks: {
	[key: string]: (ctx: Context) => any;
} = {
	"new_game": (ctx: Context) => ctx.editMessageReplyMarkup({
		reply_markup: menu.new_game
	}),

	"stats": (ctx: Context) => ctx.reply("fetch player data"),

	"new_game_back": (ctx: Context) => ctx.editMessageReplyMarkup({
		reply_markup: menu.game_menu
	})
}
