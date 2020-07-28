import * as http from "http";

import WebSocket from "ws";
import incomingWith from "./incomingWith";
import sendToNewbie from "./sendToNewbie";
import useContext from "../context/useContext";
import useStat from "../stat/useStat";

export default function handleConnectionWith({
  wss,
}: {
  wss: WebSocket.Server;
}) {
  return (ws: WebSocket, request: http.IncomingMessage): void => {
    const context = useContext();
    const stat = useStat();

    const id = request.headers["x-id"] as string;
    ++stat.connected;

    sendToNewbie(ws);

    ws.on("message", incomingWith({ id, wss }));
    ws.on("close", () => {
      delete context.connections[id];
      ++stat.disconnected;
    });
    ws.on("error", () => {
      ++stat.socketError;
    });
  };
}
