import * as http from "http";

import Map from "../map/models/Map";
import WebSocket from "ws";
import incomingWith from "./incomingWith";
import url from "url";
import useCharacter from "../character/useCharacter";
import useClientReplier from "./useClientReplier";
import useStat from "../stat/useStat";

export default function handleConnectionWith({ map }: { map: Map }) {
  return async (
    ws: WebSocket,
    request: http.IncomingMessage
  ): Promise<void> => {
    const stat = useStat();

    const parsedUrl = url.parse(request.url ?? "", true);
    const id = parsedUrl.query["x-id"] as string;
    ++stat.connected;

    const { reply } = useClientReplier({ ws });
    const character = useCharacter({ id, map, sendMessage: reply });

    ws.on("message", incomingWith({ character }));
    ws.on("close", () => {
      character.request("despawn");

      ++stat.disconnected;
    });
    ws.on("error", () => {
      ++stat.socketError;
    });
  };
}
