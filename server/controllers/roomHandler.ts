import Rooms from "../utils/Rooms";

function registerRoomHandlers(io, socket, app) {

  function createRoom(host: string): void {
    // Create room for host on server
    const rooms: Rooms = app.get("rooms");
    const roomID = rooms.createRoom();

    // Add host to room and assigned player ID
    const room = rooms.getRoom(roomID);
    const playerID = room.addPlayer(host);
    
    // Join socket room with server created room ID
    socket.join(roomID);

    // Return back room ID and assigned player ID for room
    const data = {
      roomID,
      playerID,
      username: host
    }

    socket.emit("room:created", data);
  }

  function joinRoom(payload: any): void {
    // Get room that player is trying to join
    const rooms: Rooms = app.get("rooms");
    const room = rooms.getRoom(payload.roomID);
    
    // Check if room has space
    if (room.isFull()) {
      return;
    }

    const playerID = room.addPlayer(payload.username);

    // Join socket room
    socket.join(payload.roomID);
    
    const data = {
      playerID,
      username: payload.username
    }

    socket.emit("room:joined", data);
  }

  socket.on("room:create", createRoom);
  socket.on("room:join", joinRoom);
}

export default registerRoomHandlers;