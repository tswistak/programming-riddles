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
  const [prizeX, prizeY] = input[i + 2]
    .match(/X=(\d+), Y=(\d+)/)
    .map(Number)
    .filter((x) => !isNaN(x))
    .map((x) => x + 10000000000000);

  machines.push({
    aX,
    aY,
    bX,
    bY,
    prizeX,
    prizeY,
  });
}

let sum = 0;

for (const { aX, aY, bX, bY, prizeX, prizeY } of machines) {
  const a = Math.round((prizeY / bY - prizeX / bX) / (aY / bY - aX / bX));
  const b = Math.round((prizeX - a * aX) / bX);
  const x = a * aX + b * bX;
  const y = a * aY + b * bY;
  if (x === prizeX && y === prizeY) {
    sum += 3 * a + b;
  }
}

console.log(sum);
