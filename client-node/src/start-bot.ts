import { createBot } from "./bot";
import { range } from './util';

range(3).forEach(_ => {
  createBot()
})
