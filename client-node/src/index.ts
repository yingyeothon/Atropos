import { MAP_HEIGHT, MAP_WIDTH } from './map';
import shortid from 'shortid';
import { parseIdMoveMessages } from '../../protocol-node';
import { connect } from './connection';

(() => {

  const id = shortid()

  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  canvas.width = MAP_WIDTH
  canvas.height = MAP_HEIGHT

  document.querySelector('body')?.appendChild(canvas)

  const ctx = canvas.getContext('2d', {})
  if (!ctx) {
    return
  }

  const ws = connect() as globalThis.WebSocket

  ws.onmessage = function (ev) {
    const idPoses = parseIdMoveMessages(ev.data)

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    idPoses.forEach(([id, x, y]) => {
      ctx.font = "3px";
      ctx.fillText(id, x, y);
    })
  }
})()
