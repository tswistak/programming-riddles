const fs = require("fs");

const input = fs
  .readFileSync("./input", "utf8")
  // .readFileSync("./sample", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const maxY = input.length;
const maxX = input[0].length;

const isPaper = (char) => char === "@";

const getAdjacentPositions = (x, y) => {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
    [x - 1, y - 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y + 1],
  ].filter(([nx, ny]) => nx >= 0 && nx < maxX && ny >= 0 && ny < maxY);
};

let result = 0;

const removePapers = () => {
  let removedCount = 0;
  for (let i = 0; i < maxY; i++) {
    for (let j = 0; j < maxX; j++) {
      if (isPaper(input[i][j])) {
        const adjacentPositions = getAdjacentPositions(j, i);
        let paperCount = 0;
        for (const [nx, ny] of adjacentPositions) {
          if (isPaper(input[ny][nx])) {
            paperCount++;
          }
        }
        if (paperCount < 4) {
          result++;
          removedCount++;
          input[i][j] = "x";
        }
      }
    }
  }
  return removedCount;
};

while (removePapers() > 0) {}

console.log({ result });
