import http from "http";
import { Server } from "socket.io";
import createApp from "./app";
import registerRoomHandlers from "./controllers/roomHandler";
import registerTestHandlers from "./controllers/testHandler";

const app = createApp();

const port = 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    "origin": "http://localhost:3000"
  }
});

io.on("connection", onConnection);

server.listen(port, () => {
  console.log("Server is running");
});

function onConnection(socket) {
  console.log("Connected", socket.id);

  registerTestHandlers(io, socket, app)
  registerRoomHandlers(io, socket, app);
}