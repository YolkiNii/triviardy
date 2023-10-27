import express, { Router } from "express";
import { createGame } from "../controllers/gameController";
const gamesRouter: Router = express.Router();

gamesRouter
  .route("/triviardy/:id")
  .post(createGame)

export default gamesRouter;