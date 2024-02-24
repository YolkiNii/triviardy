import { Request, Response } from "express";
import Rooms from "../utils/Rooms";
import TriviaAPIRequester from "../utils/TriviaAPIRequester";
import TriviardyGame from "../utils/TriviardyGame"

const DEFAULT_NUM_QUESTIONS = 16;

export async function createGame(req: Request, res: Response): Promise<any> {
  // Check if received request param
  if (!req?.params?.id) {
    return res.status(400).json({ message: "No room ID given." });
  }

  const roomID = req.params.id;

  // Get the app's rooms instance
  const app = req.app;
  const rooms: Rooms = app.get("rooms");
 
  // Check if room exists
  if (!rooms.checkRoom(roomID)) {
    return res.status(404).json({ message: "Room does not exist." });
  }

  const room = rooms.getRoom(roomID);

  console.log(req.body);

  // Check if categories information was sent
  if (!req?.body?.categories) {
    return res.status(400).json({ message: "No categories given" });
  }

  const categories = req.body.categories;

  // Setup and create game
  const triviaAPI = new TriviaAPIRequester(categories);
  const triviaGame = new TriviardyGame(triviaAPI);
  await triviaGame.fillQuestions(DEFAULT_NUM_QUESTIONS);
  
  const players = room.getAllPlayers();

  for (const player in players) {
    triviaGame.addPlayer(players[player]);
  }

  triviaGame.setRandomTurnPlayer();
  triviaGame.setGameInSession(true);
  room.setGame(triviaGame);

  console.log(triviaGame);

  // Notify players that game is created and started
  return res.status(200).json({ message: "Game created and started!" });
}