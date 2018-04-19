import WebSocket = require("ws");
import { config } from "./config";
import { IncomingMessage } from "http";


const wss = new WebSocket.Server({ host: config.SERVER_HOST, port: config.SERVER_PORT });

wss.on("connection", (socket: WebSocket, request: IncomingMessage) : void => {
  socket.on("message", (request: WebSocket.Data) => {
    console.log("received: %s", request);
  });

  socket.on("open", (): void => {
    console.log("connected");
  });
  
  socket.on("close", (): void => {
    console.log("disconnected");
  });

  setInterval(function() {
    if (socket.readyState === WebSocket.OPEN) {
      console.log("sending...");
      socket.send(config.DATA);
    }
  }, config.SEND_INTERVAL);
});
