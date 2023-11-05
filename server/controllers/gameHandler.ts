import Rooms from "../utils/Rooms";
import TriviardyGame from "../utils/TriviardyGame";

function registerGameHandlers(io, socket, app) {

  function initializeClientGame(roomID: string) {
    const rooms: Rooms = app.get("rooms");

    if (!rooms.checkRoom(roomID)) {
      return;
    }
    
    const room = rooms.getRoom(roomID);
    const game = room.getGame() as TriviardyGame;
    
    const data = {};
    data["questions"] = game.allQuestionsToObject();
    console.log("Initialize client", data);

    // Initialize clients games
    io.emit("game:initialize", data);
  }

  socket.on("game:request_initialize", initializeClientGame)
}

export default registerGameHandlers;