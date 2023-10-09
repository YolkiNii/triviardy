import createApp from "./app";
import createSocket from "./socket";

const app = createApp();
const server = createSocket(app);

const port = 3001;

server.listen(port, () => {
  console.log("Server is running")
});
