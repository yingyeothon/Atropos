import { createBot } from "./bot";
import { range } from './util';

range(2).forEach(_ => {
  createBot()
})
