const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n");

const machines = [];

for (let i = 0; i < input.length; i += 4) {
  const [, aX, aY] = input[i].match(/X\+(\d+), Y\+(\d+)/).map(Number);
  const [, bX, bY] = input[i + 1].match(/X\+(\d+), Y\+(\d+)/).map(Number);
  const [, prizeX, prizeY] = input[i + 2].match(/X=(\d+), Y=(\d+)/).map(Number);

  machines.push({
    aX,
    aY,
    bX,
    bY,
    prizeX,
    prizeY,
  });
}

const LIMIT = 100;
let sum = 0;

for (const { aX, aY, bX, bY, prizeX, prizeY } of machines) {
  let minTokens = Infinity;
  for (let i = 0; i < LIMIT; i++) {
    for (let j = 0; j < LIMIT; j++) {
      const x = aX * i + bX * j;
      const y = aY * i + bY * j;
      if (x === prizeX && y === prizeY) {
        const cost = i * 3 + j;
        minTokens = Math.min(minTokens, cost);
      }
    }
  }

  if (minTokens !== Infinity) {
    sum += minTokens;
  }
}

console.log(sum);
