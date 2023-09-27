import express, { Express } from "express";
import cors from "cors";
import GameServer from "./utils/GameServer";
import roomRouter from "./routes/roomRouter";

function createApp() : Express {
  const app = express();

  // Apply imported middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Add Game Server Instance
  const gameServer = new GameServer();
  app.set("gameServer", gameServer);

  // Rooms route
  app.use("/rooms", roomRouter);

  return app;
}

export default createApp;