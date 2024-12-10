const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split("").map(Number));

function getNeighbors([x, y]) {
  const result = [];
  const current = input[x][y];
  const directions = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (const [i, j] of directions) {
    if (
      input[i] != null &&
      input[i][j] != null &&
      input[i][j] - current === 1
    ) {
      result.push([i, j]);
    }
  }
  return result;
}

const zeros = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === 0) {
      zeros.push([i, j]);
    }
  }
}

let trailheads = 0;

for (const start of zeros) {
  const visited = new Set();
  const seen9 = new Set();
  const queue = [start];
  while (queue.length > 0) {
    const current = queue.shift();
    visited.add(current.toString());
    const neighbors = getNeighbors(current);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.toString())) {
        queue.push(neighbor);
        if (
          input[neighbor[0]][neighbor[1]] === 9 &&
          !seen9.has(neighbor.toString())
        ) {
          trailheads++;
          seen9.add(neighbor.toString());
        }
      }
    }
  }
}

console.log(trailheads);
