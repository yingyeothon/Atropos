import delay from "delay"
import { diffBefore } from '../common/util';

export const stat = {
  time: 0,
  render: 0,
}

export const monitorStat = async () => {

  const diff = {
    time: diffBefore(() => stat.time),
    render: diffBefore(() => stat.render),
  }

  while (true) {
    stat.time = Date.now()

    const secDiff = diff.time() / 1000
    const renderDiff = diff.render()

    const renderPerSec = (renderDiff / (secDiff));

    console.log(`render: ${renderPerSec.toFixed(3)}/s`)

    await delay(5000)
  }
}
