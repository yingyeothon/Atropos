import stat, { Stat } from "./stat";

import sleep from "../utils/sleep";

export default async function startStatMonitor(): Promise<void> {
  const capture = captureStatDiff();
  while (true) {
    const diff = capture();

    console.log(
      new Date().toISOString(),
      "\n",
      "Raw",
      ...Object.entries(stat).map(([k, v]) => `${k}=${v}`),
      "\n",
      "Diff",
      ...Object.entries(diff).map(([k, v]) => `${k}=${v}`),
      "\n",
      `snt/rcv=` + (diff.sent / diff.received).toFixed(3),
      `rcv/bct=` + (diff.received / diff.broadcast).toFixed(3),
      `snt/bct=` + (diff.sent / diff.broadcast).toFixed(3),
      `bfc/afc=` +
        (diff.countBeforeCoalesce / diff.countAfterCoalesce).toFixed(3),
      `bel/bct=` + (diff.broadcastElapsed / diff.broadcast).toFixed(3),
      `bdl/bct=` + (diff.broadcastDataLength / diff.broadcast).toFixed(3),
      `bsm/bct=` + (diff.broadcastSleepMillis / diff.broadcast).toFixed(3)
    );

    await sleep(5000);
  }
}

function captureStatDiff() {
  const diff: { [K in keyof Stat]?: () => number } = {};
  for (const anyKey of Object.keys(stat)) {
    const key = anyKey as keyof Stat;
    diff[key] = diffBefore(() => stat[key]);
  }
  return (): Stat => {
    const captured: Partial<Stat> = {};
    for (const [key, getDiff] of Object.entries(diff)) {
      captured[key as keyof Stat] = getDiff!();
    }
    return captured as Stat;
  };
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
