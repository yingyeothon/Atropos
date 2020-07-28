import Move from "./models/move";
import PosMap from "./models/posMap";

export default function moveToMap(moves: Move[]): PosMap {
  const map: PosMap = {};
  for (const move of moves) {
    map[move.id] = move.pos;
  }
  return map;
}
