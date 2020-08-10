import * as http from "http";
import * as net from "net";
import * as url from "url";

import WebSocket from "ws";
import useStat from "../stat/useStat";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function upgradeConnectionWith({
  wss,
}: {
  wss: WebSocket.Server;
}) {
  const connectedIds = new Set<string>();
  return (
    request: http.IncomingMessage,
    socket: net.Socket,
    head: Buffer
  ): void => {
    const stat = useStat();

    ++stat.upgraded;
    const parsedUrl = url.parse(request.url ?? "", true);
    const pathname = parsedUrl.pathname;
    if (pathname !== "/xy") {
      socket.destroy();
      return;
    }

    const id = ((parsedUrl.query["x-id"] as string) ?? "").trim();
    if (!id) {
      socket.destroy();
      return;
    }

    if (connectedIds.has(id)) {
      socket.destroy();
      return;
    }
    connectedIds.add(id);

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
      ws.on("close", () => {
        connectedIds.delete(id);
      });
    });
  };
}
