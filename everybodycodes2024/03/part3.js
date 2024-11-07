const fs = require("fs");

const grid = fs
  .readFileSync("./everybody_codes_e2024_q3_p3.txt", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(""));

const result = [];

function isBorder(x, y, blank) {
  for (let i = x - 1; i <= x + 1; i++) {
    if (i < 0 || i === grid.length) {
      return true;
    }
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) {
        continue;
      }
      if (j < 0 || j === grid[i].length) {
        return true;
      }
      if (grid[i][j] === blank) {
        return true;
      }
    }
  }
  return false;
}

let foundAny = true;
let n = 0;
const toIgnore = new Set();
while (foundAny) {
  foundAny = false;
  const blank = n === 0 ? "." : (n - 1).toString();
  toIgnore.add(blank);
  const newChar = n.toString();
  let currentResult = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (toIgnore.has(grid[i][j])) {
        continue;
      }
      if (isBorder(i, j, blank)) {
        foundAny = true;
        currentResult++;
        grid[i][j] = newChar;
      }
    }
  }
  if (foundAny) {
    result.push(currentResult);
  }
  n++;
}

const finalResult = result.reduce((prev, curr, i) => prev + curr * (i + 1), 0);

console.log(finalResult);
