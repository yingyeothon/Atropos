import Map from "./models/Map";
import MapObject from "./models/MapObject";
import Pos2D from "./models/Pos2D";

export interface CharacterPosition {
  move(newPosition: Pos2D): void;
  despawn(): void;

  getPosition(): Pos2D;
}

export default function usePosition({
  target,
  initialPosition,
  map,
}: {
  target: MapObject;
  initialPosition: Pos2D;
  map: Map;
}): CharacterPosition {
  let position: Pos2D = initialPosition;

  function move(newPosition: Pos2D) {
    const oldPosition = position;
    position = newPosition;

    map.moveObject({ from: oldPosition, to: newPosition, target });
  }

  function despawn() {
    map.despawnObject({ pos: position, target });
  }

  function getPosition(): Pos2D {
    return position;
  }
  return { move, despawn, getPosition };
}
