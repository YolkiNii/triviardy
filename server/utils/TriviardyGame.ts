import Question, { IQuestion } from "./Question";
import QuestionRequester from "./QuestionRequester";
import Game from "./Game";
import TriviardyPlayer, { ITriviardyPlayer } from "./TriviardyPlayer";
import Player from "./Player";

class TriviardyGame extends Game {
  players: { [playerid: number]: TriviardyPlayer; };
  playerIDs: number[];
  playerAnsweredCount: number;
  turnPlayerID: number;
  questions: Question[];
  answeredQuestionsCount: number;
  questionSupplier: QuestionRequester;

  constructor(questionSupplier: QuestionRequester) {
    super();
    this.questionSupplier = questionSupplier;
    this.playerIDs = [];
    this.playerAnsweredCount = 0;
    this.answeredQuestionsCount = 0;
  }

  async fillQuestions(numQuestions: number) {
    this.questions = await this.questionSupplier.getQuestions(numQuestions);
  }

  getQuestionByID(id: number): Question {
    return this.questions[id];
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

  getPlayerByID(id: number): TriviardyPlayer {
    return this.players[id];
  }

  setRandomTurnPlayer(): void {
    this.turnPlayerID = this.playerIDs[Math.floor(Math.random() * this.playerIDs.length)];
  }

  setTurnPlayer(playerID: number): void {
    this.turnPlayerID = playerID;
  }

  markQuestionAsAnswered(questionID: number): void {
    const question: Question = this.getQuestionByID(questionID);

    question.answered = true;
    this.answeredQuestionsCount++;

    this.questions[questionID] = question;
  }

  resetPlayerAnswerAvailability(): void {
    Object.keys(this.players).forEach((playerID) => {
      this.players[playerID].setHaveAnswered(false);
    });
  }

  getPlayerAnsweredCount(): number {
    return this.playerAnsweredCount;
  }

  setPlayerAnsweredCount(count: number): void {
    this.playerAnsweredCount = count;
  }

  questionHasBeenAnswered(): boolean {
    return this.playerAnsweredCount >= this.playerIDs.length;
  }

  gameIsOver(): boolean {
    return this.answeredQuestionsCount >= this.questions.length;
  }
}

export default TriviardyGame;