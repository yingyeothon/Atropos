import WebSocket from "ws";
import moveToMap from "../context/moveToMap";
import serializeMap from "../context/serializeMap";
import useContext from "../context/useContext";
import useStat from "../stat/useStat";

export default function broadcastDifferences(wss: WebSocket.Server): void {
  const context = useContext();
  const stat = useStat();

  context.state = "broadcasting";

  // Swap pending queue.
  const pending = context.pending;
  context.pending = [];

  // Send diff.
  const localMap = moveToMap(pending);
  const ser = serializeMap(localMap);

  ++stat.broadcast;
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(ser);
      ++stat.sent;
    }
  });

  context.state = "receiving";
}
