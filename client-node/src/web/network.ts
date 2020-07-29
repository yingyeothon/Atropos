import { connect } from '../common/connection';
import { parseIdMoveMessages } from '../../../protocol-node';
import { World } from './world';
import shortid from 'shortid';

export const startNetwork = ({
                               world
                             }: {
  world: World
}) => {

  const ws = connect(shortid()) as WebSocket

  ws.onmessage = function (ev) {
    const idPoses = parseIdMoveMessages(ev.data)
    idPoses.forEach(idPos => {
      world[idPos[0]] = idPos
    })
  }
}
