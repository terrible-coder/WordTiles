import { User } from "@grammyjs/types";
import { default as Datastore } from "nedb";
import { PlayerStats } from "./game/player";
import { WordGame } from "./game/wordgame";

export type PlayerData = {
	_id: number,
	user: User,
	stats: PlayerStats
}

const playerData = new Datastore({ filename: "./data/players.db" });
playerData.loadDatabase();

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

export async function getPlayer(id: number, callback: Function) {
	playerData.findOne({ _id: id }, { _id: 1 }, (err, doc) => {
		if (err !== null)
			console.log("something went wrong", err);
		callback(doc);
	});
}

export type GameData = {
	game: WordGame,
	player1_id: number,
	player2_id: number,
}

const gamesData: Map<number, WordGame> = new Map<number, WordGame>();

export function addGame(game: GameData) {
	gamesData.set(game.player1_id, game.game);
	gamesData.set(game.player2_id, game.game);
}

export function delGame(game: GameData) {
	gamesData.delete(game.player1_id);
	gamesData.delete(game.player2_id);
}