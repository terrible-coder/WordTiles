import { User } from "@grammyjs/types";

export type PlayerStats = {
	gold: number,
	games: {
		played: number,
		win: number
	}
}

export class Player {
	readonly user: User;
	public nickname: string;
	readonly stats: PlayerStats;
	public game_id: number | undefined = undefined;

	constructor(user: User, nick: string) {
		this.user = user;
		this.nickname = nick;
		this.stats = {
			gold: 100,
			games: { played: 0, win: 0 }
		}
	}

	join(game: number) {
		this.game_id = game;
	}

	finish(status: "win" | "lose", gold: number) {
		this.game_id = undefined;
		this.stats.games.played++;
		this.stats.games.win += status === "win"? 1: 0;
		this.stats.gold += gold;
	}

}