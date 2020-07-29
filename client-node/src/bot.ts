import { MAP_HEIGHT, MAP_WIDTH } from "./map";
import { getRandomInt, getRandomIntRange } from "./util";

import WebSocket from "ws";
import { connect } from "./connection";
import { serializeMoveMessage } from "../../protocol-node";
import shortid from "shortid";

interface BotPos {
  x: number;
  y: number;
}

interface Bot {
  move: () => void;
  send: () => Promise<void>;
}

export const createBot = (): Bot => {
  const id = shortid();
  console.log(`createBot: ${id}`);

  const ws = connect(id) as WebSocket;
  const pos: BotPos = {
    x: getRandomInt(MAP_WIDTH),
    y: getRandomInt(MAP_HEIGHT),
  };

  let vx = getRandomIntRange(1, 3);
  let vy = getRandomIntRange(1, 3);
  function move() {
    if (pos.x <= 0 || pos.x >= MAP_WIDTH) {
      vx *= -1;
    }
    if (pos.y <= 0 || pos.y >= MAP_HEIGHT) {
      vy *= -1;
    }

    pos.x += vx;
    pos.y += vy;
  }

  function send() {
    return new Promise<void>((resolve, reject) =>
      ws.readyState === ws.OPEN
        ? ws.send(serializeMoveMessage(pos.x, pos.y), (error) =>
            error ? reject(error) : resolve()
          )
        : resolve()
    );
  }

  ws.on("message", (data: string) => {
    // Do nothing
  });
  return { move, send };
};
