import http from "http";
import { Server } from "socket.io";

/* 
  Register event handlers for socket
*/
function registerHandlers(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      "origin": "*"
    }
  });

  io.on("connection", onConnection);

  return io;
}

function onConnection(socket) {
  console.log("Connected!");
}

export default registerHandlers