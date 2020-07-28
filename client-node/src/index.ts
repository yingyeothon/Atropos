import { MAP_HEIGHT, MAP_WIDTH, SERVER_URL } from './constant';
import shortid from 'shortid';
import { parseIdMoveMessages } from '../../protocol-node';

(() => {

  const id = shortid()

  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  canvas.width = MAP_WIDTH
  canvas.height = MAP_HEIGHT

  document.querySelector('body')?.appendChild(canvas)

  const context = canvas.getContext('2d', {})
  if (!context) {
    return
  }

  context.beginPath();
  context.rect(20, 20, 150, 100);
  context.fillStyle = "red";
  context.fill();

  const ws = new WebSocket(SERVER_URL)

  ws.onmessage = function (ev) {
    const idPoses = parseIdMoveMessages(ev.data)
    console.log(idPoses)
  }
})()
