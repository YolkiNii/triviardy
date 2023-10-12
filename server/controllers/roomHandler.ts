import Rooms from "../utils/Rooms";

function registerRoomHandlers(io, socket, app) {
  console.log("Registering room handlers");

  function createRoom(host: string): void {
    // Create room for host on server
    const rooms: Rooms = app.get("rooms");
    console.log(rooms);
    const roomID = rooms.createRoom();

    // Add host to room and assigned player ID
    const room = rooms.getRoom(roomID);
    const playerID = room.addPlayer(host);
    
    // Join socket room with server created room ID
    socket.join(roomID);

    // Return back room ID and assigned player ID for room
    const data = {
      roomID,
      playerID
    }
    console.log("Created room", data);
    socket.emit("room:created", data);
  }

  socket.on("room:create", createRoom);
}

export default registerRoomHandlers;