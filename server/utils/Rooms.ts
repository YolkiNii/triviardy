import Room from "./Room";

class Rooms {
  rooms: {[roomID: string]: Room};

  createRoom(roomID: string): void {
    this.rooms[roomID] = new Room(roomID);
  }

  getRoom(roomID: string): Room {
    return this.rooms[roomID];
  }
}

export default Rooms;