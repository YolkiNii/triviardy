import express, { Router } from "express";
import { getRoom } from "../controllers/roomController";
const roomsRouter: Router = express.Router();

roomsRouter
  .route("/:id")
  .get(getRoom)

export default roomsRouter;