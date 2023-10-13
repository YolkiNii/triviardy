import Player from "./Player";
import Game from "./Game";

class Room {
  id: string;
  playerIDCount: number = 0;
  game: Game;
  players: {[playerid: number]: Player} = {};

  constructor(id: string) {
    this.id = id;
  }

  setGame(game: Game): void {
    this.game = game;
  }

  addPlayer(username: string): number {
    const playerID = this.playerIDCount;
    this.players[playerID] = new Player(playerID, username);
    this.playerIDCount++;

    return playerID;
  }

  removePlayer(id: string): void {
    delete this.players[id];
  }
}

export default Room;
