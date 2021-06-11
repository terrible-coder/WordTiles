import { Context } from "grammy";
import { Player } from "./game/player";
import { menu } from "./menu";

/**
 * Text displayed upon using the /start command.
 */
const start = `Welcome to the WordTiles game bot!
I hope you have a good time playing.
/register yourself before anything. Once you have read the /rules, you can start playing the /game.
/help will be given to all those who ask for it.`;

/**
 * Text displayed upon using the /help command.
 */
const help = `I am here to help you.

This is a 2 player game for bored friends/couples stuck at home.
/register Add yourself to the list of players worldwide.
/rules Learn about the rules of the game.
/game Play the game and check out your stats.
/help Display this help message.

Make sure you have a username for your Telegram account. That is how this bot keeps track of players in the database and during any match.`

/**
 * Text displayed upon using the /rules command.
 */
const rules = `Okay, so here are the rules:
Both players are given 4 vowels and 7 consonants.`;

export type Commands = {
	[key: string]: {
		desc: string,
		res: (ctx: Context) => any;
	}
}

export const command_list: Commands = {
	start: {
		desc: "Starts the bot",
		res: ctx => ctx.reply(start)
	},
	help: {
		desc: "Send help!",
		res: ctx => [help, "I hope that helped."].forEach(line => ctx.reply(line))
	},
	rules: {
		desc: "How to play?",
		res: ctx => [rules, "Let's play!"].forEach(line => ctx.reply(line))
	},
	register: {
		desc: "I wanna join!",
		res: ctx => {
			if(ctx.from === undefined)
				return ctx.reply("Something went wrong. Please try again.");
			if(!ctx.from.username)
				return ctx.reply("Please make sure you have a username for your account. It is used to register and identify players.");
			new Player(ctx.from);
			return ctx.reply("Successfully registered");
		}
	},
	game: {
		desc: "Let's play!",
		res: ctx => ctx.reply("Game menu", {
			reply_markup: menu.game_menu
		})
	},
	join: {
		desc: "I wanna join a game...",
		res: ctx => {
			if(!ctx.match)
				return ctx.reply("Please enter a room ID after the command. Eg.: /join 1129");
			if(isNaN(<any>ctx.match))
				return ctx.reply("Please enter a valid room ID.");
			// look up room ID and add player to game
		}
	}
}
