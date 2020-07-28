import { VERSION } from "../../protocol-node";
import sleep from "./utils/sleep";
import startWebSocketServer from "./server/startWebSocketServer";
import useStat from "./stat/useStat";

console.log(VERSION);

(async () => {
  startWebSocketServer({
    port: +(process.env.PORT ?? "8989"),
  });
  const stat = useStat();
  while (true) {
    console.log(new Date().toISOString(), stat);
    await sleep(5000);
  }
})();
