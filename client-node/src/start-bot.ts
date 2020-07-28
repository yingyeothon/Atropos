import { createBot } from "./bot";
import { range } from './util';

range(50).forEach(_ => {
  createBot()
})
