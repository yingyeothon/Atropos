import DespawnMessage from "./DespawnMessage";
import LoadMapMessage from "./LoadMapMessage";
import MoveMessage from "./MoveMessage";
import SpawnMessage from "./SpawnMessage";

type MapMessage = SpawnMessage | DespawnMessage | MoveMessage | LoadMapMessage;
export default MapMessage;
