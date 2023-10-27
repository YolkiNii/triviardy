import Player from "./Player";

abstract class Game {
  GAME_ID_COUNT = 0;
  id: number;
  players: {[playerid: number]: Player} = {};

  constructor() {
    this.id = this.GAME_ID_COUNT;
    this.GAME_ID_COUNT++;
  }

  addPlayer(player: Player): void {
    this.players[player.id] = player;
  }

  removePlayer(playerid: number): void {
    delete this.players[playerid];
  }
}

export default Game;