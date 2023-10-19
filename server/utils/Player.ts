export interface IPlayer {
  id: number;
  username: string;
}

class Player implements IPlayer {
  id: number;
  username: string;

  constructor (id: number, username: string) {
    this.id = id;
    this.username = username;
  }
  
  setUsername(username: string): void {
    this.username = username;
  }

  toObject(): IPlayer {
    return {
      id: this.id,
      username: this.username
    }
  }
}

export default Player;