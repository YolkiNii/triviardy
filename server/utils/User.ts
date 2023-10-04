abstract class User {
  id: number;
  username: string;

  constructor (id: number, username: string) {
    this.id = id;
    this.username = username;
  }
  
  setUsername(username: string): void {
    this.username = username;
  }
}

export default User;