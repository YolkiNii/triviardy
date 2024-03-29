import Question, { IQuestion } from "./Question";
import QuestionRequester from "./QuestionRequester";
import Game from "./Game";
import TriviardyPlayer, { ITriviardyPlayer } from "./TriviardyPlayer";
import Player from "./Player";

class TriviardyGame extends Game {
  players: { [playerid: number]: TriviardyPlayer; };
  playerIDs: number[];
  turnPlayerID: number;
  selectedQuestion: Question;
  questions: Question[];
  questionSupplier: QuestionRequester;

  constructor(questionSupplier: QuestionRequester) {
    super();
    this.questionSupplier = questionSupplier;
    this.playerIDs = [];
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
    this.playerIDs.push(player.id);

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

  getTurnPlayer(): number {
    return this.turnPlayerID
  }

  setRandomTurnPlayer(): void {
    this.turnPlayerID = this.playerIDs[Math.floor(Math.random() * this.playerIDs.length)];
  }

  setTurnPlayer(playerID: number): void {
    this.turnPlayerID = playerID;
  }
}

export default TriviardyGame;