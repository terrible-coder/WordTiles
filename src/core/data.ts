import { User } from "@grammyjs/types";
import { default as Datastore } from "nedb";
import { Player, PlayerStats } from "./game/player";
import { WordGame } from "./game/wordgame";

/**
 * The structure of the object used to store player information in database.
 */
export type PlayerData = {
	_id: number,
	user: User,
	stats: PlayerStats
}

/**
 * The database which keeps tracks of all players who have registered.
 */
const playerData = new Datastore({ filename: "./data/players.db" });
playerData.loadDatabase();

/**
 * Inserts a new player's data into the database.
 * @param player Player's data.
 */
export function addPlayer(player: PlayerData) {
	playerData.find({ _id: player._id }, (_: any, docs: PlayerData[]) => {
		if(docs.length === 0)
			playerData.insert(player);
		else {
			const p = docs[0];
			const id = p._id;
			if(player.user.username !== p.user.username) {
				playerData.update({ _id: id, "user.username": p.user.username },
						  { $set: { _id: id, "user.username": player.user.username } });
			}
		}
	});
	console.log("player added");
}

/**
 * Searches through the player database for a Player by the unique ID associated
 * with its User object as assigned by Telegram.
 * @param id The unique ID of the Player's User object.
 * @param callback The function to execute once the player object has been found.
 */
export async function getPlayer(id: number, callback: Function) {
	playerData.findOne({ _id: id }, { _id: 1 }, (err, doc) => {
		if (err !== null)
			console.log("something went wrong", err);
		callback(doc);
	});
}

/**
 * Record of all players who are currently online in a game.
 */
const onlinePlayers = new Map<number, Player>();

/**
 * Adds a player to the online player records. Call only when starting a game.
 * @param player Player to add.
 */
export function addOnlinePlayer(player: Player) {
	onlinePlayers.set(player.user.id, player);
}

/**
 * Retrieve the player object from the online player records. If the player is
 * not currently online in any game, returns undefined.
 * @param id Unique User ID of the Player.
 * @returns Player object.
 */
export function getOnlinePlayer(id: number) {
	return onlinePlayers.get(id);
}

/**
 * Deletes the record of a player from the online records. Call only when a game
 * finishes or is terminated.
 * @param id The Player's unique User ID to.
 */
export function delOnlinePlayer(id: number): void;
/**
 * Deletes the record of a player from the online records. Call only when a game
 * finishes or is terminated.
 * @param player The Player object.
 */
export function delOnlinePlayer(player: Player): void;
export function delOnlinePlayer(a: number | Player) {
	const id = (a instanceof Player)? a.user.id: a;
	onlinePlayers.delete(id);
}

/**
 * The structure of the object used to store an ongoing game's information.
 */
export type GameData = {
	game: WordGame,
	playerID: [number, number],
}

/**
 * The "database" for all ongoing games. Maps the players' IDs to the game object.
 */
const gamesData = new Map<[number, number], WordGame>();

/**
 * Inserts a new game's data into the game database.
 * @param game Game's data.
 */
export function addGame(game: GameData) {
	gamesData.set(game.playerID, game.game);
}

/**
 * Delete the record of a finished game and free its ID.
 * @param game Game's data.
 */
export function delGame(game: GameData) {
	gamesData.delete(game.playerID);
}

/**
 * Gets the IDs of all ongoing games.
 * @returns Array of ongoing game IDs.
 */
export function getGameIDs() {
	const IDs: number[] = [];
	for(let value of gamesData.values())
		IDs.push(value.game_id);
	return IDs;
}

/**
 * Gets the IDs of all players who are currently playing a game.
 * @returns Array of players currently playing.
 */
export function getPlayerIDs() {
	const IDs: number[] = [];
	for(let key of gamesData.keys())
		IDs.push(...key);
	return IDs;
}

/**
 * Retrieve the WordGame object the player is playing in. Returns undefined if
 * player is not online in any game.
 * @param id The unique User ID of Player.
 */
export function getPlayerGame(id: number): WordGame | undefined;
/**
 * Retrieve the WordGame object the player is playing in. Returns undefined if
 * player is not online in any game.
 * @param player The Player object.
 */
export function getPlayerGame(player: Player): WordGame | undefined;
export function getPlayerGame(a: Player | number) {
	const id1 = a instanceof Player? a.user.id : a;
	const IDs = getPlayerIDs();
	const index = IDs.indexOf(id1);
	if(index === -1)
		return undefined;
	const key: [number, number] = index % 2 === 0? [IDs[index - 1], id1] : [id1, IDs[index + 1]];
	return gamesData.get(key);
}
