import http from "http";
import createApp from "./app";

const app = createApp();
const server = http.createServer(app);

export default server;