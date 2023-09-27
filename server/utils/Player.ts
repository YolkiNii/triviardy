class Player {
  score: number;
  id: number;
  username: string;

 constructor(username: string, id: number) {
    this.score = 0;
    this.username = username;
    this.id = id;
  }

  updateScore(earnedScore: number) {
    this.score += earnedScore;
  }
  
}

export default Player;