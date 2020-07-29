const stat = {
  received: 0,
  broadcast: 0,
  sent: 0,
  upgraded: 0,
  connected: 0,
  connectionError: 0,
  socketError: 0,
  disconnected: 0,
  countBeforeCoalesce: 0,
  countAfterCoalesce: 0,
};

export default stat;

export type Stat = typeof stat;
