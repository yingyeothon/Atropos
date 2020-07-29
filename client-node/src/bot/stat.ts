import delay from "delay"
import { performance } from 'perf_hooks'
import { diffBefore } from '../common/util';

export const stat = {
  botCount: 0,
  send: 0,
  time: 0,
}

export const monitorStat = async () => {

  const diff = {
    time: diffBefore(() => stat.time),
    send: diffBefore(() => stat.send),
  }

  while (true) {
    stat.time = performance.now()

    const secDiff = diff.time() / 1000
    const sendDiff = diff.send()

    const sendPerSec = (sendDiff / secDiff);
    const botSendPerSec = sendPerSec / stat.botCount

    console.log(`send: ${sendPerSec.toFixed(3)}/s botSend: ${botSendPerSec.toFixed(3)}/s`)

    await delay(5000)
  }
}
