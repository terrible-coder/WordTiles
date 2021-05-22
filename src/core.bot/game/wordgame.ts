import { randomInt } from "crypto";
import { Bot } from "grammy";
import { Player } from "./player";

/**
 * The number of vowel tiles any Player gets.
 */
const vowel_count = 4;
/**
 * The number of consonant tiles any Player gets.
 */
const consonant_count = 7;

/**
 * Generates a random letter.
 * @param type 
 * @returns A single letter character.
 */
function random_letter(type: "vowel" | "consonant") {
	const vowels = ["A", "E", "I", "O", "U"];
	const consonants = ["B", "C", "D", "F", "G", "H", "J",
						"K", "L", "M", "N", "P", "Q", "R",
						"S", "T", "V", "W", "X", "Y", "Z"];
	if(type === "vowel")
		return vowels[randomInt(vowels.length)];
	return consonants[randomInt(consonants.length)];
}

/**
 * Randomises the order of strings in an array.
 * @param letters An array of strings.
 * @returns An array with the order randomised.
 */
function random_sort(letters: string[]) {
	const sorted: string[] = [];
	const n = letters.length;
	for(let i = 0; i < n; i++) {
		const index = randomInt(letters.length);
		sorted.push(letters[index]);
		letters.splice(index, 1);
	}
	return sorted;
}

/**
 * The structure for the object which stores the Game's statistics so far.
 */
export type GameStats = {
	players: [
		{ player: Player, letters: string[], word: string, gold: number },
		{ player: Player, letters: string[], word: string, gold: number }
	],
	pot: number
}

/**
 * Handles all the central logic of the game.
 */
export class WordGame {

	/** The Bot instance. */
	static bot: Bot;

	/** The unique game ID. */
	readonly game_id: number;
	/** The statistics of the game so far. */
	readonly stats: GameStats;

	constructor(players: [Player, Player], id: number) {
		this.game_id = id;
		this.stats = {
			players: [
				{ player: players[0], letters: [], word: "", gold: 0 },
				{ player: players[1], letters: [], word: "", gold: 0 }
			],
			pot: 100
		}
	}

	/**
	 * Distribute the letter tiles to the players.
	 */
	public distribute() {
		this.stats.players.forEach(() => {
			let letters: string[] = [];
			for(let i = 0; i < vowel_count; i++)
				letters.push(random_letter("vowel"));
			for(let i = 0; i < consonant_count; i++)
				letters.push(random_letter("consonant"));
			letters = random_sort(letters);
			const text = [
				"Your letters are:",
				`\`${letters.join(" ")}\``
			].join("\n");
			// send text to player `p`
		});
	}

	/**
	 * Reveal the letter tiles of the players to their opponents.
	 */
	public reveal() {
		// send(this.stats.players[0], this.stats.players[1].letters);
		// send(this.stats.players[1], this.stats.players[0].letters);
	}

	start() {
		this.distribute();
		// wait for word formation (within certain time limit)
		this.reveal();
		// start the turns

		const [player1, player2] = this.stats.players;
		player1.player.finish("win", player1.gold);
		player2.player.finish("lose", player2.gold);
	}
}