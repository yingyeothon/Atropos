import MapObject from "./MapObject";

export default interface MapTile {
  objects: { [id: string]: MapObject };
}
