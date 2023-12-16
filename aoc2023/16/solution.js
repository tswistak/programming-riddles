const fs = require("fs");

function parseData(data) {
  return data.map((x) => x.split(""));
}

function canGo(grid, i, j) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length;
}

function part1(data) {
  const grid = parseData(data);
  const visitedNodes = new Set();
  const queue = [{ startI: 0, startJ: 0, direction: [0, 1] }];
  while (queue.size > 0) {
    const { startI, startJ, direction } = queue.pop();
    const visitedPreviously = visitedNodes.size;
    let i = startI;
    let j = startJ;
    let [dirI, dirJ] = direction;
    const queueCandidates = [];
    while (canGo(grid, i, j)) {
      const currentChar = grid[i][j];
      visitedNodes.add(`${i},${j}`);
      if (currentChar === "/") {
        tmp = dirJ;
        dirJ = -dirI;
        dirI = -tmp;
      } else if (currentChar === "\\") {
        tmp = dirJ;
        dirJ = dirI;
        dirI = tmp;
      } else if (currentChar === "|" && Math.abs(dirJ) > 0) {
        dirI = 1;
        dirJ = 0;
        queueCandidates.push({
          startI: i - 1,
          startJ: j,
          direction: [-1, 0],
        });
      } else if (currentChar === "-" && Math.abs(dirI) > 0) {
        dirI = 0;
        dirJ = 1;
        queueCandidates.push({
          startI: i,
          startJ: j - 1,
          direction: [0, -1],
        });
      }
      i += dirI;
      j += dirJ;
    }
    if (visitedPreviously !== visitedNodes.size) {
      queue.push(...queueCandidates);
    }
  }
  return visitedNodes.size;
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

console.log(part1(testData));
console.log(part1(realData));
// console.log(part2(testData));
// console.log(part2(realData));
