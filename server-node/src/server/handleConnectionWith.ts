import * as http from "http";

import WebSocket from "ws";
import incomingWith from "./incomingWith";
import sendToNewbie from "./sendToNewbie";
import url from "url";
import useContext from "../context/useContext";
import useStat from "../stat/useStat";

export default function handleConnectionWith({
  wss,
}: {
  wss: WebSocket.Server;
}) {
  return async (
    ws: WebSocket,
    request: http.IncomingMessage
  ): Promise<void> => {
    const context = useContext();
    const stat = useStat();

    const parsedUrl = url.parse(request.url ?? "", true);
    const id = parsedUrl.query["x-id"] as string;
    ++stat.connected;

    await sendToNewbie(ws);

    ws.on("message", incomingWith({ id, wss }));
    ws.on("close", () => {
      delete context.connections[id];
      delete context.map[id];

      ++stat.disconnected;
    });
    ws.on("error", () => {
      ++stat.socketError;
    });
  };
}
