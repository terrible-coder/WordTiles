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
	playerData.insert(player, err => {
		if(err !== null)
			if((<any>err).errorType === "uniqueViolated")
				console.log("Player already exists.");
	});
	console.log("player added");
}