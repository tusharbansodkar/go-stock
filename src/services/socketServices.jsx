import { io } from "socket.io-client";

const SOCKET_URL = "https://go-stock-backend.onrender.com";

export const sharedSocket = io(SOCKET_URL, {
  autoConnect: false,
});
