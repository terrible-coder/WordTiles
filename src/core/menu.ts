import { Context, InlineKeyboard } from "grammy";
import { getPlayer } from "./data";
import { Player } from "./game/player";

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

	"stats": (ctx: Context) => {
		if(!ctx.from)
			return ctx.reply("Message was not from a user(??)");
		console.log(ctx.from);
		getPlayer(ctx.from.id, (player: Player | undefined) => {
			if(!player)
				return ctx.reply("Player not registered on server yet. Consider /register.");
			const message = `Player ${player.user.username}
	
	_Played_: ${player.stats.games.played}
	_Games won_: ${player.stats.games.win}
	_Gold won_: ${player.stats.gold}`;
			return ctx.reply(message, {
				parse_mode: "MarkdownV2"
			});
		});
	},

	"new_game_back": (ctx: Context) => ctx.editMessageReplyMarkup({
		reply_markup: menu.game_menu
	})
}
