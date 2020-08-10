import Character from "../character/models/Character";
import WebSocket from "ws";
import { parseMoveMessage } from "../../../protocol-node";
import useStat from "../stat/useStat";

export default function incomingWith({
  character,
}: {
  character: Character;
}): (data: WebSocket.Data) => void {
  return (data: WebSocket.Data) => {
    const pos = parseMoveMessage(data.toString());
    if (pos === null) {
      return;
    }

    character.request("move", { x: pos[0], y: pos[1] });

    const stat = useStat();
    ++stat.received;
  };
}
