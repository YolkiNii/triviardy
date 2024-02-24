import Player from "./Player";

abstract class Game {
  GAME_ID_COUNT = 0;
  id: number;
  players: {[playerid: number]: Player} = {};
  gameInSession: boolean;

  constructor() {
    this.id = this.GAME_ID_COUNT;
    this.gameInSession = false;
    this.GAME_ID_COUNT++;
  }

  addPlayer(player: Player): void {
    this.players[player.id] = player;
  }

  removePlayer(playerid: number): void {
    delete this.players[playerid];
  }

  getGameInSession(): boolean {
    return this.gameInSession;
  }

  setGameInSession(status: boolean) {
    this.gameInSession = status;
  }
  
}

export default Game;