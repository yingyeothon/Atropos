import IdMap from "./idMap";
import WebSocket from "ws";

type ConnectionMap = IdMap<WebSocket>;

export default ConnectionMap;
