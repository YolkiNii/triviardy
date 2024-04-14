import Player, { IPlayer } from "./Player";

export interface ITriviardyPlayer extends IPlayer {
  score: number;
  haveAnswered: boolean;
}

class TriviardyPlayer extends Player implements ITriviardyPlayer {
  score: number;
  haveAnswered: boolean;

  constructor(id: number, username: string, host: boolean) {
    super(id, username, host);
    this.score = 0;
    this.haveAnswered = false;
  }

  updateScore(scored: number) {
    this.score += scored;
  }

  toObject(): ITriviardyPlayer {
    return {
      ...super.toObject(),
      score: this.score,
      haveAnswered: this.haveAnswered
    }
  }
}

export default TriviardyPlayer;