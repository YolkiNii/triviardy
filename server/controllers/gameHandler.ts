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
    data["players"] = game.allPlayersToObject();
    console.log("Initialize client", data);

    // Initialize client's game
    io.to(roomID).emit("game:initialize", data);
  }

  socket.on("game:request_initialize", initializeClientGame)
}

export default registerGameHandlers;