import { createBot } from "./bot";
import delay from "delay";
import { range } from "./util";

async function main() {
  const bots = range(500).map((_) => createBot());
  while (true) {
    bots.forEach((bot) => bot.move());
    await Promise.all(bots.map((bot) => bot.send()));

    await delay(1000 / 60);
  }
}

if (require.main === module) {
  main();
}
