import User from "./User";

class Player extends User {
  constructor(id: number, username: string) {
    super(id, username);
  }
}

export default Player;