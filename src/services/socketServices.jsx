import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const sharedSocket = io(SOCKET_URL, {
  autoConnect: false,
});
