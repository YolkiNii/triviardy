import { io } from "socket.io-client";

export const URL = "http://localhost:3001";
const socket = io(URL);

export default socket;