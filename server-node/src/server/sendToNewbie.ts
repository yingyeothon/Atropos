import WebSocket from "ws";
import serializeMap from "../context/serializeMap";
import useContext from "../context/useContext";

export default function sendToNewbie(client: WebSocket): void {
  client.send(serializeMap(useContext().map));
}
