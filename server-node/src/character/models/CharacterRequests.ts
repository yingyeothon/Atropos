import Pos2D from "../../map/models/Pos2D";

export default interface CharacterRequests {
  load(): void;
  move(pos: Pos2D): void;
  despawn(): void;
}
