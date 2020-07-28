import { VERSION } from "../../protocol-node";
import startStatMonitor from "./stat/startStatMonitor";
import startWebSocketServer from "./server/startWebSocketServer";

if (require.main === module) {
  console.log(VERSION);
  startWebSocketServer({
    port: +(process.env.PORT ?? "8989"),
  });
  startStatMonitor();
}
