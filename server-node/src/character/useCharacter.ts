import Character from "./models/Character";
import CharacterRequests from "./models/CharacterRequests";
import CharacterSendMessage from "./models/CharacterSendMessage";
import Map from "../map/models/Map";
import Pos2D from "../map/models/Pos2D";
import usePosition from "../map/usePosition";

export default function useCharacter({
  id,
  map,
  sendMessage,
}: {
  id: string;
  map: Map;
  sendMessage: CharacterSendMessage;
}): Character {
  const mapObject = { id, sendMessage };
  const position = usePosition({
    target: mapObject,
    initialPosition: { x: 0, y: 0 },
    map,
  });

  function load() {
    map.sendMapToObject({ target: mapObject });
  }

  function move(pos: Pos2D) {
    position.move(pos);
  }

  function despawn() {
    position.despawn();
  }

  const handlers: CharacterRequests = { load, move, despawn };

  let sequential = Promise.resolve();
  const request: Character["request"] = (type, ...remains) => {
    sequential = sequential.then(() =>
      handlers[type].apply(handlers[type], remains)
    );
    return sequential;
  };

  return { id, request, sendMessage };
}
