import sleep from "../utils/sleep";
import stat from "./stat";

export default async function startStatMonitor(): Promise<void> {
  let oldReceived = 0;
  let oldBroadcast = 0;
  let oldSent = 0;
  while (true) {
    const receivedDiff = stat.received - oldReceived;
    const broadcastDiff = stat.broadcast - oldBroadcast;
    const sentDiff = stat.sent - oldSent;

    const spr = sentDiff / receivedDiff;
    const rpb = receivedDiff / broadcastDiff;
    const spb = sentDiff / broadcastDiff;

    console.log(
      new Date().toISOString(),
      ...Object.entries(stat).map(([k, v]) => `${k}=${v}`),
      `snt/rcv=` + spr.toFixed(3),
      `rcv/bct=` + rpb.toFixed(3),
      `snt/bct=` + spb.toFixed(3)
    );

    oldReceived = stat.received;
    oldBroadcast = stat.broadcast;
    oldSent = stat.sent;
    await sleep(5000);
  }
}
