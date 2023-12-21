const fs = require("fs");

function parseData(data) {
  const grid = data.map((x) => x.split(""));
  let y = 0;
  let x = 0;

  for (let i = 0; i < grid.length; i++) {
    const index = grid[i].indexOf("S");
    if (index >= 0) {
      y = i;
      j = index;
      break;
    }
  }

  return {
    grid,
    start: [y, x],
  };
}

function part1(data, maxSteps) {
  const { grid, start } = parseData(data);
  const visited = new Set();
  const stopped = [];
  let queue = [start];
  for (let i = 0; i < maxSteps; i++) {
    const nextQueue = [];
    while (queue.length) {
      const current = queue.pop();
      visited.add(`${current[0]},${current[1]}`);
      let isStopped = false;
      const candidates = [
        [current[0] - 1, current[1]],
        [current[0] + 1, current[1]],
        [current[0], current[1] - 1],
        [current[0], current[1] + 1],
      ];
      for (const [nextI, nextJ] of candidates) {
        const char = grid[nextI]?.[nextJ];
        if (!char || char === "#") {
          isStopped = true;
        } else if (char === "." && !visited.has(`${nextI},${nextJ}`)) {
          nextQueue.push([nextI, nextJ]);
        }
      }
      if (isStopped) {
        stopped.push(current);
      }
    }
    queue = nextQueue;
  }
  return queue.length + stopped.length;
}

function part2(data) {
  //
}

const testData = fs
  .readFileSync("./test.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

// TODO wrong result
console.log(part1(testData, 6));
console.log(part1(realData, 64));
console.log(part2(testData));
console.log(part2(realData));
