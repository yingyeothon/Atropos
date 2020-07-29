import delay from 'delay';
import { World } from './world';
import { MAP_HEIGHT, MAP_WIDTH } from '../common/map';
import { stat } from './stat';


export const initRender = ({
                             world
                           }: {
  world: World
}) => {
  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  canvas.width = MAP_WIDTH
  canvas.height = MAP_HEIGHT

  document.querySelector('body')?.appendChild(canvas)

  startRender({
    ctx: canvas.getContext('2d')!,
    world,
  })
}

export const startRender = async ({
                                    ctx,
                                    world,
                                  }: {
  ctx: CanvasRenderingContext2D
  world: World
}) => {
  while (true) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    Object.values(world).forEach(([id, x, y]) => {
      ctx.font = "3px";
      ctx.fillText(id, x, y);
    })

    stat.render++;

    await delay(1000 / 60)
  }
}
