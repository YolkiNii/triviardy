import { Request, Response } from "express";
import Rooms from "../utils/Rooms";

export function getRoom(req: Request, res: Response): any {
  // Check if request is valid
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

   // Check if room is full
   const room = rooms.getRoom(roomID);

   if (room.isFull()) {
    return res.status(403).json({ message: "Room is full." });
   }

   // Let client know room exists
   res.status(200).json({ message: "Room Entered!" });
}