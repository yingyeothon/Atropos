import MapMessage from "../messages/MapMessage";

export default interface MapObject {
  id: string;

  sendMessage(message: MapMessage): unknown;
}
