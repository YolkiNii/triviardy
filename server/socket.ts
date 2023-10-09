import http from "http";
import { Server } from "socket.io";

/* 
  Register event handlers for socket
*/
function createSocket(app) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      "origin": "*"
    }
  });

  function onConnection(socket) {
    console.log("Client connected!");
  }

  io.on("connection", onConnection);

  return server;
}

export default createSocket;