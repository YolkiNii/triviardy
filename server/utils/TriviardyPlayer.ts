import Player from "./Player";

class TriviardyPlayer extends Player {
  score: number

  constructor(id: number, username: string) {
    super(id, username);
    this.score = 0;
  }

  updateScore(scored: number) {
    this.score += scored;
  }
}

export default TriviardyPlayer;