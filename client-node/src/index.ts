import { IdPos, parseIdMoveMessages } from '../../protocol-node';
import { MAP_HEIGHT, MAP_WIDTH } from './map';

import { connect } from './connection';
import delay from 'delay'
import shortid from 'shortid';

const world: { [key: string]: IdPos } = {}

const render = async (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!

    while (true) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      Object.values(world).forEach(([id, x, y]) => {
        ctx.font = "3px";
        ctx.fillText(id, x, y);
      })

      await delay(1 / 60)
    }
  }

;(() => {
  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  canvas.width = MAP_WIDTH
  canvas.height = MAP_HEIGHT

  document.querySelector('body')?.appendChild(canvas)

  render(canvas)

  const ws = connect(shortid()) as globalThis.WebSocket

  ws.onmessage = function (ev) {
    const idPoses = parseIdMoveMessages(ev.data)
    idPoses.forEach(idPos => {
      world[idPos[0]] = idPos
    })
    console.log(ev.data.length, idPoses.length);
  }
})()
