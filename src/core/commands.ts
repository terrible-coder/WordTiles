import { Context } from "grammy";
import { menu } from "./menu";

const help = `I am here to help you.
Don't run away from me.`

const rules = `Okay, so here are the rules:
Both players are given 4 vowels and 7 consonants.`;

const register = `Hey! Please enter your nickname:`;

export type Commands = {
	[key: string]: {
		desc: string,
		res: (ctx: Context) => any;
	}
}

export const command_list: Commands = {
	start: {
		desc: "Starts the bot",
		res: ctx => ["You started the bot.", "wow"].forEach(line => ctx.reply(line))
	},
	help: {
		desc: "Send help!",
		res: ctx => [help, "I hope that helped."].forEach(line => ctx.reply(line))
	},
	rules: {
		desc: "How to play?",
		res: ctx => [rules, "Start playing."].forEach(line => ctx.reply(line))
	},
	register: {
		desc: "I wanna join!",
		res: ctx => [register, "Happy playing."].forEach(line => ctx.reply(line))
	},
	game: {
		desc: "Let's play!",
		res: ctx => ctx.reply("Game menu", {
			reply_markup: menu.game_menu
		})
	}
}
