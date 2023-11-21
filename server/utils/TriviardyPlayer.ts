import Player, { IPlayer } from "./Player";

export interface ITriviardyPlayer extends IPlayer {
  score: number;
}

class TriviardyPlayer extends Player implements ITriviardyPlayer {
  score: number

  constructor(id: number, username: string, host: boolean) {
    super(id, username, host);
    this.score = 0;
  }

  updateScore(scored: number) {
    this.score += scored;
  }

  toObject(): ITriviardyPlayer {
    return {
      ...super.toObject(),
      score: 0
    }
  }
}

export default TriviardyPlayer;