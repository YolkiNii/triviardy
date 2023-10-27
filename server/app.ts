import express, { Express } from "express";
import cors from "cors";
import Rooms from "./utils/Rooms";
import roomsRouter from "./routes/roomsRouter";
import gamesRouter from "./routes/gamesRouter";

/*
  Creates an instance of an express app with
  custom configurations and object to hold
  all game rooms.
*/
function createApp() : Express {
  const app = express();

  // Apply imported middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Add Rooms instance to host all rooms for the app
  const rooms = new Rooms();
  app.set("rooms", rooms);

  app.use("/room", roomsRouter);
  app.use("/games", gamesRouter);

  return app;
}

export default createApp;