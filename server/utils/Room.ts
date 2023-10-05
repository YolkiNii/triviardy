import Player from "./Player";
import Game from "./Game";

class Room {
  id: string;
  roomIDCount: number;
  game: Game;
  players: {[playerid: number]: Player};

  setGame(game: Game): void {
    this.game = game;
  }

  addPlayer(username: string): void {
    this.players[this.roomIDCount] = new Player(this.roomIDCount, username);
    this.roomIDCount++;
  }

  removePlayer(id: string): void {
    delete this.players[id];
  }
}

export default Room;
