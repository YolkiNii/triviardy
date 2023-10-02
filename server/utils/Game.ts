import Player from "./Player";
import Question from "./Question";
import QuestionRequester from "./QuestionRequester";

class Game {
  id: number;
  players: {[playerid: number]: Player};
  questions: Question[];
  questionSupplier: QuestionRequester;

  addPlayer(player: Player): void {
    this.players[player.id] = player;
  }

  removePlayer(playerid: number): void {
    delete this.players[playerid];
  }
}

export default Game;