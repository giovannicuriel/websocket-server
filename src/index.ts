import WebSocket = require("ws");
import { config } from "./config";
import { IncomingMessage, Server, ServerResponse} from "http";


function requestListener(req: IncomingMessage, res: ServerResponse) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log("Endpoint: " + req.url);
    console.log('POSTed: ' + body);
    res.statusCode = 200;
    res.write("OK");
    res.end();
  });  
}

const httpServer = new Server(requestListener);
httpServer.listen(config.SERVER_PORT, config.SERVER_HOST);

const wss = new WebSocket.Server({server: httpServer});

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
      socket.send(config.DATA);
    }
  }, config.SEND_INTERVAL);
});
