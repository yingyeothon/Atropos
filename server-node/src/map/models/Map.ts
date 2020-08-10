import MapObject from "./MapObject";
import Pos2D from "./Pos2D";

export default interface Map {
  spawnObject(args: { pos: Pos2D; target: MapObject }): void;
  despawnObject(args: { pos: Pos2D; target: MapObject }): void;

  moveObject(args: { from: Pos2D; to: Pos2D; target: MapObject }): void;
  sendMapToObject(args: { target: MapObject }): void;
}
