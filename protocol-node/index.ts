export type Test = {};

export const VERSION = "1.0.0";

export function serializeMoveMessage(x: number, y: number): string {
  return `${x} ${y}`;
}

export function parseMoveMessage(data: string): [number, number] | null {
  const index = data.indexOf(" ");
  if (index < 0) {
    return null;
  }
  const x = +data.substring(0, index);
  const y = +data.substring(index + 1);
  return isNaN(x) || isNaN(y) || x === null || y === null ? null : [x, y];
}

export function serializeIdMoveMessage(
  id: string,
  x: number,
  y: number
): string {
  return `${id} ${x} ${y}`;
}

export function parseIdMoveMessage(
  data: string
): [string, number, number] | null {
  const first = data.indexOf(" ");
  if (first < 0) {
    return null;
  }
  const second = data.indexOf(" ", first + 1);
  if (second < 0) {
    return null;
  }
  const id = data.substring(0, first);
  const x = +data.substring(first + 1, second);
  const y = +data.substring(second + 1);
  return isNaN(x) || isNaN(y) || x === null || y === null ? null : [id, x, y];
}
