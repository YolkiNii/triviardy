import Player from "./Player";
import Game from "./Game";

class Room {
  MAX_PLAYER_COUNT = 4;
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
    // Check if there is room for another player
    if (this.isFull()) {
      return -1;
    }
    
    const playerID = this.playerIDCount;
    this.players[playerID] = new Player(playerID, username);
    this.playerIDCount++;

    return playerID;
  }

  removePlayer(id: string): void {
    delete this.players[id];
  }

  isFull(): boolean {
    return this.getPlayerCount() >= this.MAX_PLAYER_COUNT;
  }

  getPlayerCount(): number {
    return Object.keys(this.playerIDCount).length;
  }

}

export default Room;
