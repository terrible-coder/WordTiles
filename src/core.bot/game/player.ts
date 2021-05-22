import { User } from "@grammyjs/types";

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
	/**	The _unique_ nickname associated with the Player. */
	public nickname: string;
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
	constructor(user: User, nick: string) {
		this.user = user;
		this.nickname = nick;
		this.stats = {
			gold: 100,
			games: { played: 0, win: 0 }
		}
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

}