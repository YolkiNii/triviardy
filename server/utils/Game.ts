import Player from "./Player";

abstract class Game {
  id: number;
  players: {[playerid: number]: Player};

  abstract startGame(): void;

  addPlayer(player: Player): void {
    this.players[player.id] = player;
  }

  removePlayer(playerid: number): void {
    delete this.players[playerid];
  }
}

export default Game;