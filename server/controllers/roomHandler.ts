import Rooms from "../utils/Rooms";

function registerRoomHandlers(io, socket, app) {

  function createRoom(username: string): void {
    // Create room for host on server
    const rooms: Rooms = app.get("rooms");
    const roomID = rooms.createRoom();

    // Add host to room and assigned player ID
    const room = rooms.getRoom(roomID);
    const playerID = room.addPlayer(username, true);
    
    // Join socket room with server created room ID
    socket.join(roomID);

    // Return back room ID and assigned player ID for room
    const data = {
      roomID,
      playerID,
      username
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

    const playerID = room.addPlayer(payload.username, false);

    // Join socket room
    socket.join(payload.roomID);
    
    const data = {
      playerID,
      username: payload.username,
      host: false
    }

    socket.emit("room:joined", data);
  }

  function joinLobby(roomID: string): void {
    // Get all players from server side represented as object
    const rooms: Rooms = app.get("rooms");

    if (!rooms.checkRoom(roomID)) {
      return;
    }
    
    const room = rooms.getRoom(roomID);

    const players = room.getAllPlayersToObject();

    console.log(players);
    io.to(roomID).emit("room:update_players", players);
  }

  socket.on("room:create", createRoom);
  socket.on("room:join", joinRoom);
  socket.on("room:join_lobby", joinLobby);
}

export default registerRoomHandlers;