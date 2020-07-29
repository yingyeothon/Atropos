import ConnectionMap from "./connectionMap";
import Move from "./move";
import PosMap from "./posMap";

export default interface Context {
  connections: ConnectionMap;
  map: PosMap;
  pending: Move[];
}
