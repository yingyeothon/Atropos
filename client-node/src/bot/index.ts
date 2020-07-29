import delay from 'delay'
import { createBot } from "./bot";
import { range } from '../common/util';
import { monitorStat, stat } from './stat';

const botCount = 500


async function main() {
  stat.botCount = botCount
  monitorStat()

  const bots = range(botCount).map((_) => createBot());
  while (true) {
    bots.forEach((bot) => bot.move());
    await Promise.all(bots.map((bot) => bot.send()));

    await delay(1000 / 60);
  }
}

if (require.main === module) {
  main();
}
