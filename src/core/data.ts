import { User } from "@grammyjs/types";
import { default as Datastore } from "nedb";
import { PlayerStats } from "./game/player";

export type PlayerData = {
	user: User,
	stats: PlayerStats
}

const playerData = new Datastore({ filename: "./data/players.db" });
playerData.loadDatabase();

export function addPlayer(player: PlayerData) {
	playerData.insert(player, err => console.log("something happened", err));
	console.log("player added");
}