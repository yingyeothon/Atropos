import WebSocket from "ws";
import { parseMoveMessage } from "../../../protocol-node";
import useContext from "../context/useContext";
import useStat from "../stat/useStat";

export default function incomingWith({
  id,
}: {
  id: string;
}): (data: WebSocket.Data) => void {
  return (data: WebSocket.Data) => {
    const pos = parseMoveMessage(data.toString());
    if (pos === null) {
      return;
    }

    const context = useContext();
    const stat = useStat();

    context.map[id] = pos;
    context.pending.push({ id, pos });
    ++stat.received;
  };
}
