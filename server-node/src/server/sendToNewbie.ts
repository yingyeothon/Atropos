import WebSocket from "ws";
import serializeMap from "../context/serializeMap";
import useContext from "../context/useContext";

export default async function sendToNewbie(client: WebSocket): Promise<void> {
  return new Promise<void>((resolve, reject) =>
    client.send(serializeMap(useContext().map), (error) =>
      error ? reject(error) : resolve()
    )
  );
}
