import PosMap from "./models/posMap";
import { serializeIdMoveMessage } from "../../../protocol-node";

export default function serializeMap(map: PosMap): string {
  return Object.entries(map)
    .map(([id, [x, y]]) => serializeIdMoveMessage(id, x, y))
    .join("\n");
}
