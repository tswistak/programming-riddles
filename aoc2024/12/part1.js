const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(""));

class Region {
  constructor() {
    this.plots = new Set();
    this.perimeter = 0;
  }

  get price() {
    return this.plots.size * this.perimeter;
  }
}

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const regions = [];
const visited = new Set();

function findRegion(x, y, type) {
  const region = new Region();
  const queue = [[x, y]];
  while (queue.length > 0) {
    const [i, j] = queue.pop();
    const key = `${i},${j}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    region.plots.add(key);
    let sides = 4;
    for (const [di, dj] of directions) {
      const newI = i + di;
      const newJ = j + dj;
      if (
        newI >= 0 &&
        newI < input.length &&
        newJ >= 0 &&
        newJ < input[newI].length
      ) {
        if (input[newI][newJ] === type) {
          queue.push([newI, newJ]);
          sides--;
        }
      }
    }
    region.perimeter += sides;
  }
  return region;
}

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (!visited.has(`${i},${j}`)) {
      regions.push(findRegion(i, j, input[i][j]));
    }
  }
}

const result = regions.reduce((acc, curr) => acc + curr.price, 0);

console.log(result);
