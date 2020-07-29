import WebSocket from "ws";
import broadcastDifferences from "./broadcastDifferences";
import sleep from "../utils/sleep";
import useStat from "../stat/useStat";

export default async function startBroadcast({
  wss,
}: {
  wss: WebSocket.Server;
}): Promise<void> {
  const stat = useStat();
  while (true) {
    const start = Date.now();
    await broadcastDifferences(wss);
    const elapsed = Date.now() - start;

    const sleepMillis = Math.max(0, 1000 / 60 - elapsed);
    stat.broadcastSleepMillis += sleepMillis;

    await sleep(Math.max(0, sleepMillis));
  }
}
