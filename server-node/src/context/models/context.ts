import ConnectionMap from "./connectionMap";
import Move from "./move";
import PosMap from "./posMap";
import ServerState from "./serverState";

export default interface Context {
  state: ServerState;
  connections: ConnectionMap;
  map: PosMap;
  pending: Move[];
}
