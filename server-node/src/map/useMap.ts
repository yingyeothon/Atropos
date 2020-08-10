import LoadMapMessage from "./messages/LoadMapMessage";
import Map from "./models/Map";
import MapData from "./models/MapData";
import MapMessage from "./messages/MapMessage";
import MapObject from "./models/MapObject";
import Pos2D from "./models/Pos2D";

type ParamsOf<K extends keyof Map> = Parameters<Map[K]>[0];
type ReturnOf<K extends keyof Map> = ReturnType<Map[K]>;

export default function useMap({
  width,
  height,
}: {
  width: number;
  height: number;
}): Map {
  const mapData: MapData = {};
  for (let y = 0; y < height; ++y) {
    mapData[y] = {};
    for (let x = 0; x < width; ++x) {
      mapData[y][x] = {
        objects: {},
      };
    }
  }
  const allObjects: { [id: string]: MapObject } = {};

  function putObject(target: MapObject, pos: Pos2D) {
    mapData[pos.y][pos.x].objects[target.id] = target;
  }

  function deleteObject(target: MapObject, pos: Pos2D) {
    delete mapData[pos.y][pos.x].objects[target.id];
  }

  function broadcastToAll(message: MapMessage, excepts: string[] = []) {
    Object.values(allObjects)
      .filter((each) => !excepts.includes(each.id))
      .forEach((target) => target.sendMessage(message));
  }

  function spawnObject({
    target,
    pos,
  }: ParamsOf<"spawnObject">): ReturnOf<"spawnObject"> {
    putObject(target, pos);
    allObjects[target.id] = target;

    broadcastToAll({ type: "spawn", id: target.id, pos }, [target.id]);
  }

  function despawnObject({
    target,
    pos,
  }: ParamsOf<"despawnObject">): ReturnOf<"despawnObject"> {
    deleteObject(target, pos);
    delete allObjects[target.id];

    broadcastToAll({ type: "despawn", id: target.id }, [target.id]);
  }

  function moveObject({
    from,
    to,
    target,
  }: ParamsOf<"moveObject">): ReturnOf<"moveObject"> {
    deleteObject(target, from);
    putObject(target, to);

    broadcastToAll({ type: "move", id: target.id, pos: to });
  }

  function sendMapToObject({
    target,
  }: ParamsOf<"sendMapToObject">): ReturnOf<"sendMapToObject"> {
    const objects: LoadMapMessage["objects"] = [];
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        for (const obj of Object.values(mapData[y][x].objects)) {
          objects.push({ id: obj.id, y, x });
        }
      }
    }
    target.sendMessage({ type: "loadMap", objects });
  }

  return {
    spawnObject,
    despawnObject,
    moveObject,
    sendMapToObject,
  };
}
