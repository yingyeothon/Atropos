export const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

export const getRandomIntRange = (min: number, max: number) => min + getRandomInt(max - min)

export const range = (n: number) => [...Array(2000).keys()]
