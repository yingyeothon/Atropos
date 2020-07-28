import WebSocket from "ws";
import broadcastDifferences from "./broadcastDifferences";
import { parseMoveMessage } from "../../../protocol-node";
import useContext from "../context/useContext";
import useStat from "../stat/useStat";

export default function incomingWith({
  wss,
  id,
}: {
  wss: WebSocket.Server;
  id: string;
}): (data: WebSocket.Data) => Promise<void> {
  return async (data: WebSocket.Data) => {
    const pos = parseMoveMessage(data.toString());
    if (pos === null) {
      return;
    }

    const context = useContext();
    const stat = useStat();

    context.map[id] = pos;
    context.pending.push({ id, pos });
    ++stat.received;

    if (context.state === "receiving") {
      await broadcastDifferences(wss);
    }
  };
}
