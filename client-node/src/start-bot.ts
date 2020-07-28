import { createBot } from "./bot";
import { range } from './util';

range(5).forEach(_ => {
  createBot()
})
