import { Context, InlineKeyboard } from "grammy";

/**
 * The `menu` object stores all the inline keyboards used by the bot. The
 * property name for the keyboards should match the callback data which upon
 * receiving returns the inline keyboard.
 */
export const menu = {
	game_menu: new InlineKeyboard()
					.text("New game", "new_game").row()
					.text("Player stats", "stats"),

	new_game: new InlineKeyboard()
					.text("One v One", "1v1").row()
					.text("<< Back", "new_game_back")
};

/**
 * An object which maps the callback data received by the bot to the response
 * the bot is supposed to take for the respective callback.
 */
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
