import sleep from "../utils/sleep";
import stat from "./stat";

export default async function startStatMonitor(): Promise<void> {
  const diff = {
    received: diffBefore(() => stat.received),
    broadcast: diffBefore(() => stat.received),
    sent: diffBefore(() => stat.received),
    countBeforeCoalesce: diffBefore(() => stat.countBeforeCoalesce),
    countAfterCoalesce: diffBefore(() => stat.countAfterCoalesce),
  };
  while (true) {
    const receivedDiff = diff.received();
    const broadcastDiff = diff.broadcast();
    const sentDiff = diff.sent();

    const spr = sentDiff / receivedDiff;
    const rpb = receivedDiff / broadcastDiff;
    const spb = sentDiff / broadcastDiff;
    const bpa = diff.countBeforeCoalesce() / diff.countAfterCoalesce();

    console.log(
      new Date().toISOString(),
      ...Object.entries(stat).map(([k, v]) => `${k}=${v}`),
      `snt/rcv=` + spr.toFixed(3),
      `rcv/bct=` + rpb.toFixed(3),
      `snt/bct=` + spb.toFixed(3),
      `bfc/afc=` + bpa.toFixed(3)
    );

    await sleep(5000);
  }
}

function diffBefore(getter: () => number) {
  let lastValue = getter();
  return (): number => {
    const newValue = getter();
    const diffValue = newValue - lastValue;
    lastValue = newValue;
    return diffValue;
  };
}
