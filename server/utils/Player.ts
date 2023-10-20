export interface IPlayer {
  id: number;
  username: string;
  host: boolean;
}

class Player implements IPlayer {
  id: number;
  username: string;
  host: boolean;

  constructor (id: number, username: string, host: boolean) {
    this.id = id;
    this.username = username;
    this.host = host;
  }
  
  setUsername(username: string): void {
    this.username = username;
  }

  toObject(): IPlayer {
    return {
      id: this.id,
      username: this.username,
      host: this.host
    }
  }
}

export default Player;