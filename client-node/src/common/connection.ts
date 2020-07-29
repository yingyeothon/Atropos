import { isBrowser, isNode } from "browser-or-node";

import NodeWebSocket from 'ws'

const SERVER_URL = 'ws://localhost:8989/xy'

export const connect = (id: string) => {
  const url = `${SERVER_URL}?x-id=${id}`

  if (isBrowser) {
    return new WebSocket(url)
  } else if (isNode) {
    return new NodeWebSocket(url)
  } else {
    throw new Error('Not supported environment')
  }
}
