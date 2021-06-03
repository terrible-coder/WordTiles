import { randomInt } from "crypto";
import { Bot } from "grammy";
import { addGame, delGame } from "../data";
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
		addGame({ game: this, playerID: [players[0].user.id, players[1].user.id] });
	}

	/**
	 * Distribute the letter tiles to the players.
	 */
	public distribute() {
		this.stats.players.forEach(p => {
			p.letters = getLetters();
			const text = [
				"Your letters are:",
				`\`${p.letters.join(" ")}\``
			].join("\n");
			p.player.sendMessage(text);
		});
	}

	/**
	 * Reveal the letter tiles of the players to their opponents.
	 */
	public reveal() {
		const [p1, p2] = this.stats.players;
		const base = "Your opponent has the letters:\n\n";
		const text1 = base + `\`${p2.letters.join(" ")}\``;
		const text2 = base + `\`${p1.letters.join(" ")}\``;
		p1.player.sendMessage(text1);
		p2.player.sendMessage(text2);
	}

	start() {
		this.distribute();
		// wait for word formation (within certain time limit)
		this.reveal();
		// start the turns

		const [player1, player2] = this.stats.players;
		player1.player.finish("win", player1.gold);
		player2.player.finish("lose", player2.gold);
		delGame({
			game: this,
			playerID: [player1.player.user.id, player2.player.user.id]
		});
	}
}

function getLetters() {
	let letters: string[] = [];
	for (let i = 0; i < vowel_count; i++)
		letters.push(random_letter("vowel"));
	for (let i = 0; i < consonant_count; i++)
		letters.push(random_letter("consonant"));
	letters = random_sort(letters);
	return letters;
}
