import http from "http";
import { Server } from "socket.io";
import registerRoomHandlers from "./controllers/roomHandler";

/* 
  Register event handlers for server socket
*/
function createSocket(app) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      "origin": "http://localhost:3000"
    }
  });

  app.set("socketio", io);

  function onConnection(socket) {
    console.log("Connected", socket.id);
    registerRoomHandlers(io, socket, app);
  }

  io.on("connection", onConnection);

  return server;
}

export default createSocket;