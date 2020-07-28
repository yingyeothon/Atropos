import * as http from "http";
import * as net from "net";
import * as url from "url";

import WebSocket from "ws";
import useContext from "../context/useContext";
import useStat from "../stat/useStat";

export default function upgradeConnectionWith({
  wss,
}: {
  wss: WebSocket.Server;
}) {
  return (
    request: http.IncomingMessage,
    socket: net.Socket,
    head: Buffer
  ): void => {
    const context = useContext();
    const stat = useStat();

    ++stat.upgraded;
    const parsedUrl = url.parse(request.url ?? "", true);
    const pathname = parsedUrl.pathname;
    const id = parsedUrl.query["x-id"] as string;
    if (id && !(id in context.connections) && pathname === "/xy") {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        // Double check
        if (id in context.connections) {
          socket.destroy();
          return;
        }

        context.connections[id] = ws;

        wss.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  };
}
