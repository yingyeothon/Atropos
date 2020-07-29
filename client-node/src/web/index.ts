import { World } from './world';
import { initRender } from './render';
import { monitorStat } from './stat';
import { startNetwork } from './network';


;(() => {
  const world: World = {}

  monitorStat()

  initRender({
    world
  })

  startNetwork({
    world
  })
})()
