import Player from "./Player";
import Question from "./Question";
import QuestionRequester from "./QuestionRequester";

class Game {
  id: number;
  playeridCount: number;
  players: {[playerid: number]: Player};
  questions: Question[];
  questionSupplier: QuestionRequester;

  addPlayer(username: string): void {
    this.players[this.playeridCount] = new Player(username, this.playeridCount);

    this.playeridCount++;
  }

  removePlayer(playerid: number): void {
    delete this.players[playerid];
  }
}

export default Game;