const help = `I am here to help you.
Don't run away from me.`

const rules = `Okay, so here are the rules:
Both players are given 4 vowels and 7 consonants.`;

const register = `Hey! Please enter your nickname:`;

const edit_nick = `Your current nickname is smoll_pp. Enter your new nickname:
(enter ❌ to skip change)`;

export type Commands = {
	[key: string]: {
		desc: string,
		message: string[]
	}
}

export const command_list: Commands = {
	start: {
		desc: "Starts the bot",
		message: ["You started the bot.", "wow"]
	},
	help: {
		desc: "Send help!",
		message: [help, "I hope that helped."]
	},
	rules: {
		desc: "How to play?",
		message: [rules, "Start playing."]
	},
	register: {
		desc: "I wanna join!",
		message: [register, "Happy playing."]
	},
	edit_nick: {
		desc: "I don't like my name.",
		message: [edit_nick]
	}
}
