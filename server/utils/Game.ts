import Player from "./Player";

abstract class Game {
  id: number;
  players: {[playerid: number]: Player};

  constructor(id: number) {
    this.id = id;
  }

  addPlayer(player: Player): void {
    this.players[player.id] = player;
  }

  removePlayer(playerid: number): void {
    delete this.players[playerid];
  }
}

export default Game;