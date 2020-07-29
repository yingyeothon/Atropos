import WebSocket from "ws";
import moveToMap from "../context/moveToMap";
import serializeMap from "../context/serializeMap";
import useContext from "../context/useContext";
import useStat from "../stat/useStat";

export default async function broadcastDifferences(
  wss: WebSocket.Server
): Promise<void> {
  const context = useContext();
  const stat = useStat();

  context.state = "broadcasting";

  // Swap pending queue.
  const pending = context.pending;
  context.pending = [];

  // Send diff.
  const localMap = moveToMap(pending);
  stat.countBeforeCoalesce += pending.length;
  stat.countAfterCoalesce += Object.keys(localMap).length;

  const ser = serializeMap(localMap);

  ++stat.broadcast;

  // Broadcast with promise.
  const promises: Promise<void>[] = [];
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      promises.push(
        new Promise<void>((resolve, reject) =>
          client.send(ser, (error) => (error ? reject(error) : resolve()))
        )
      );
      ++stat.sent;
    }
  });
  try {
    await Promise.all(promises);
  } catch (error) {
    // Ignore sending error.
  }

  context.state = "receiving";
}
