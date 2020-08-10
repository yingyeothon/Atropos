import Pos2D from "../models/Pos2D";

export default interface SpawnMessage {
  type: "spawn";
  id: string;
  pos: Pos2D;
}
