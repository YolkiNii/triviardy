import Room from "./Room";

class Rooms {
  ROOM_ID_LENGTH: number = 20;
  rooms: {[roomID: string]: Room} = {};

  createRoom(): string {
    const roomID = this.generateRoomID(this.ROOM_ID_LENGTH);
    this.rooms[roomID] = new Room(roomID);

    return roomID;
  }

  getRoom(roomID: string): Room {
    return this.rooms[roomID];
  }

  generateRoomID(length: number): string {
    let id = "";
    const chars = 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const numChars = chars.length;
  
    for (let i = 0; i < length; i++)
      id += chars.charAt(Math.floor(Math.random() * numChars));

    while ((id in this.rooms)) {
      id = "";
      for (let i = 0; i < length; i++)
        id += chars.charAt(Math.floor(Math.random() * numChars));
    }

    return id;
  }
}

export default Rooms;