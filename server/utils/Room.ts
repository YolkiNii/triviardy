import Game from "./Game";
import Player from "./Player";

class Room {
  id: string;
  roomIDCount: number;
  game: Game;
  players: {[playerid: number]: Player};

  addPlayer(username: string): void {
    this.players[this.roomIDCount] = new Player(username, this.roomIDCount);
    this.roomIDCount++;
  }

  removePlayer(id: string): void {
    delete this.players[id];
  }
}

export default Room;