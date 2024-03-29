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

    data["gameInSession"] = game.getGameInSession();

    // Initialize client's game
    io.to(roomID).emit("game:initialize", data);
  }

  function sendClientGameState(roomID: string) {
    const rooms: Rooms = app.get("rooms");

    if (!rooms.checkRoom(roomID)) {
      return;
    }

    const room = rooms.getRoom(roomID);
    const game = room.getGame() as TriviardyGame;
    
    const data = {};

    data["questions"] = game.allQuestionsToObject();
    data["players"] = game.allPlayersToObject();
    data["turnPlayerID"] = game.getTurnPlayer();
    console.log("Game updated", data);

    socket.emit("game:update_game", data);
  }

  function sendSelectedQuestion(recieved: any) {
    const rooms: Rooms = app.get("rooms");

    if (!rooms.checkRoom(recieved.roomID)) {
      return;
    }

    const room = rooms.getRoom(recieved.roomID);
    const game = room.getGame() as TriviardyGame;

    const data = {};

    data["question"] = game.getQuestionByID(recieved.id);

    io.to(recieved.roomID).emit("game:question_selected", data);
  }

  socket.on("game:request_initialize", initializeClientGame)
  socket.on("game:request_game_state", sendClientGameState);
  socket.on("game:request_question_select", sendSelectedQuestion);
}

export default registerGameHandlers;