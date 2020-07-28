import WebSocket from 'ws';
import shortid from 'shortid';
import { parseIdMoveMessages, serializeMoveMessage } from '../../protocol-node';
import { getRandomInt } from './util';
import delay from 'delay';
import { MAP_HEIGHT, MAP_WIDTH, SERVER_URL } from './constant';

export const createBot = () => {
  const id = shortid()

  console.log(`createBot: ${id}`)

  const ws = new WebSocket(SERVER_URL, {
    headers: {
      'x-id': id,
    }
  })

  ws.on('message', (data: string) => {
    const idPoses = parseIdMoveMessages(data)
    // console.log(idPoses)
  })

  ;(async () => {
    while (true) {
      const x = getRandomInt(MAP_WIDTH)
      const y = getRandomInt(MAP_HEIGHT)
      ws.send(serializeMoveMessage(x, y))
      await delay(1 / 60)
    }
  })()
}
