import Question, { IQuestion } from "./Question";
import QuestionRequester from "./QuestionRequester";
import Game from "./Game";
import TriviardyPlayer, { ITriviardyPlayer } from "./TriviardyPlayer";
import Player from "./Player";

class TriviardyGame extends Game {
  players: { [playerid: number]: TriviardyPlayer; };
  questions: Question[];
  questionSupplier: QuestionRequester;

  constructor(questionSupplier: QuestionRequester) {
    super();
    this.questionSupplier = questionSupplier;
  }

  async fillQuestions(numQuestions: number) {
    this.questions = await this.questionSupplier.getQuestions(numQuestions);
  }

  setQuestionSupplier(questionSupplier: QuestionRequester) {
    this.questionSupplier = questionSupplier;
  }

  allQuestionsToObject(): IQuestion[] {
    return this.questions.map((question) => {
      return question.toObject();
    });
  }

  addPlayer(player: Player): void {
    this.players[player.id] = new TriviardyPlayer(player.id, player.username,
                                                  player.host);

    return;
  }

  allPlayersToObject(): { [playerid: number]: ITriviardyPlayer} {
    // Create copy of current players record
    const playersCopy = {};

    Object.keys(this.players).forEach((playerID) => {
      playersCopy[playerID] = this.players[playerID].toObject();
    });

    return playersCopy;
  }
}

export default TriviardyGame;