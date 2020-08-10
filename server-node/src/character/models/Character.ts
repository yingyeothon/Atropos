import CharacterRequests from "./CharacterRequests";
import CharacterSendMessage from "./CharacterSendMessage";

type ParamsOf<K extends keyof CharacterRequests> = Parameters<
  CharacterRequests[K]
> extends []
  ? [void]
  : Parameters<CharacterRequests[K]>;

export default interface Character {
  id: string;
  sendMessage: CharacterSendMessage;

  request<K extends keyof CharacterRequests>(
    type: K,
    ...args: ParamsOf<K>
  ): Promise<void>;
}
