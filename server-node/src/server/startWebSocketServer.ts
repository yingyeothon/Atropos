import * as http from "http";

import WebSocket from "ws";
import handleConnectionWith from "./handleConnectionWith";
import upgradeConnectionWith from "./upgradeConnectionWith";
import useStat from "../stat/useStat";

export default function startWebSocketServer({
  port = 8989,
}: {
  port?: number;
}): WebSocket.Server {
  const stat = useStat();

  const server = http.createServer();
  const wss = new WebSocket.Server({ noServer: true });

  wss.on("connection", handleConnectionWith({ wss }));
  wss.on("error", () => {
    ++stat.connectionError;
  });

  server.on("upgrade", upgradeConnectionWith({ wss }));

  server.listen(port);
  return wss;
}
