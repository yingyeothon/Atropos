import WebSocket from "ws";
import useStat from "../stat/useStat";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useClientReplier({ ws }: { ws: WebSocket }) {
  const stat = useStat();
  let sent: Promise<unknown> = Promise.resolve();

  function sendAsync(body: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      ++stat.sent;
      ws.send(body, (error) => (error ? reject(error) : resolve()));
    });
  }

  function reply(message: unknown) {
    sent = sent.then(() => sendAsync(JSON.stringify(message)));
    return sent;
  }

  return { reply };
}
