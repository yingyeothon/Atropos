import WebSocket from 'ws';
import shortid from 'shortid';
import { serializeMoveMessage } from '../../protocol-node';
import { getRandomInt } from './util';
import delay from 'delay';
import { MAP_HEIGHT, MAP_WIDTH } from './map';
import { connect } from './connection';

export const createBot = () => {
  const id = shortid()

  console.log(`createBot: ${id}`)

  const ws = connect() as WebSocket

  ws.on('open', () => {
    idle(ws)
  })

  ws.on('message', (data: string) => {
    // Do nothing
  })
}

const idle = async (ws: WebSocket) => {
  let x = getRandomInt(MAP_WIDTH)
  let y = getRandomInt(MAP_HEIGHT)

  let vx = getRandomInt(2)
  let vy = getRandomInt(2)

  while (true) {
    if (x <= 0 || x >= MAP_WIDTH) {
      vx *= -1
    }
    if (y <= 0 || y >= MAP_HEIGHT) {
      vy *= -1
    }

    x += vx
    y += vy

    ws.send(serializeMoveMessage(x, y))
    await delay(1 / 10)
  }
}
