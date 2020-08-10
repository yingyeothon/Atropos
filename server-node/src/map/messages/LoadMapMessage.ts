export default interface LoadMapMessage {
  type: "loadMap";
  objects: { id: string; x: number; y: number }[];
}
