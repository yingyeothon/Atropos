export const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

export const getRandomIntRange = (min: number, max: number) => min + getRandomInt(max - min)

export const range = (n: number) => [...Array(n).keys()]

export const diffBefore = (getter: () => number) => {
  let lastValue = getter();
  return (): number => {
    const newValue = getter();
    const diffValue = newValue - lastValue;
    lastValue = newValue;
    return diffValue;
  };
}
