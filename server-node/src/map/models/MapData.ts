import MapTile from "./MapTile";

export default interface MapData {
  [y: number]: MapRow;
}

export type MapRow = { [x: number]: MapTile };
