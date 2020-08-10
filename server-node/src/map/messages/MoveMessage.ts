import Pos2D from "../models/Pos2D";

export default interface MoveMessage {
  type: "move";
  id: string;
  pos: Pos2D;
}
