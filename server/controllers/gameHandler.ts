import Player from "../utils/Player";
import Question from "../utils/Question";
import Rooms from "../utils/Rooms";
import TriviardyGame from "../utils/TriviardyGame";
import TriviardyPlayer from "../utils/TriviardyPlayer";

function registerGameHandlers(io, socket, app) {

  function initializeClientGame(roomID: string) {
    const rooms: Rooms = app.get("rooms");

    if (!rooms.checkRoom(roomID)) {
      return;
    }
    
    const data = {};

    data["gameInSession"] = true;

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

    data["question"] = game.getQuestionByID(recieved.questionID);

    io.to(recieved.roomID).emit("game:question_selected", data);
  }

  function sendAnswerUpdate(recieved: {roomID: string, playerID: number, questionID: number, answer: string}) {
    const rooms: Rooms = app.get("rooms");

    if (!rooms.checkRoom(recieved.roomID)) {
      return;
    }

    const room = rooms.getRoom(recieved.roomID);
    const game = room.getGame() as TriviardyGame;

    const data = {};
    const question: Question = game.getQuestionByID(recieved.questionID);

    // Calculate question points
    let score: number;

    switch (question.difficulty) {
      case "hard":
        score = 300;
        break;
      case "medium":
        score = 200;
        break;
      default:
        score = 100;
        break;
    }

    // Apply score increment or decrement depending on answer
    if (recieved.answer !== question.answer)
      score *= -1;

    const player: TriviardyPlayer = game.getPlayerByID(recieved.playerID);
    player.updateScore(score);

    // Give the turn to the player if they answered it correctly
    if (score > 0)
      game.setTurnPlayer(recieved.playerID);

    // Mark down player's attempt to answer
    player.setHaveAnswered(true);

    data["questions"] = game.allQuestionsToObject();
    data["players"] = game.allPlayersToObject();
    data["turnPlayerID"] = game.getTurnPlayer();

    io.to(recieved.roomID).emit("game:update_game", data);
  }

  socket.on("game:request_initialize", initializeClientGame)
  socket.on("game:request_game_state", sendClientGameState);
  socket.on("game:request_question_select", sendSelectedQuestion);
  socket.on("game:request_answer_select", sendAnswerUpdate);
}

export default registerGameHandlers;