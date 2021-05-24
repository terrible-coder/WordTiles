import { User } from "@grammyjs/types";
import { default as Datastore } from "nedb";
import { PlayerStats } from "./game/player";

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