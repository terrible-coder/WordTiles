import { User } from "@grammyjs/types";
import { bot } from "../bot";
import { addPlayer, PlayerData } from "../data";

/**
 * The structure for the object which stores the Player's statistics so far.
 */
export type PlayerStats = {
	gold: number,
	games: {
		played: number,
		win: number
	}
}

/**
 * This class handles all the data for a player.
 */
export class Player {

	/**	The user's information as provided by the Telegram Bot API. */
	readonly user: User;
	/** The statistics of the Player so far. */
	readonly stats: PlayerStats;
	/** The unique ID of the game the player is in. */
	public game_id: number | undefined = undefined;

	/**
	 * Creates a new Player object. This object is created only once for each
	 * user. The object is then stored in the database unless the user decides
	 * to delete their records.
	 * @param user The user's data as received from the Bot API.
	 * @param nick The nickname of the user used to register into the database.
	 */
	constructor(user: User) {
		this.user = user;
		this.stats = {
			gold: 100,
			games: { played: 0, win: 0 }
		}
		addPlayer(this.getData());
	}

	/**
	 * Formats the Player object data into a JSON object that can be easily
	 * stored in a database.
	 * @returns Data formatted to be stored in the database.
	 */
	public getData(): PlayerData {
		return {
			_id: this.user.id,
			user: this.user,
			stats: this.stats
		}
	}

	/**
	 * Creates a Player object from an entry from the database.
	 * @param data Data from database.
	 */
	public getPlayer(data: PlayerData) {
		const p = new Player(data.user);
		p.stats.gold = data.stats.gold;
		p.stats.games = data.stats.games;
	} 

	/**
	 * Adds the Player to a game.
	 * @param game The unique ID of the game.
	 */
	join(game: number) {
		this.game_id = game;
	}

	/**
	 * Called when the Player finishes a game. Updates the statistics of the
	 * player according to the results of the game.
	 * @param status Whether won or lost.
	 * @param gold The gold won in the game.
	 */
	finish(status: "win" | "lose", gold: number) {
		this.game_id = undefined;
		this.stats.games.played++;
		this.stats.games.win += status === "win"? 1: 0;
		this.stats.gold += gold;
	}

	public sendMessage(text: string, ...args: any) {
		bot.api.sendMessage(this.user.id, text, ...args);
	}
}