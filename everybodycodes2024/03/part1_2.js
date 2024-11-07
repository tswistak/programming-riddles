const fs = require("fs");

const grid = fs
  // .readFileSync("./everybody_codes_e2024_q3_p1.txt", {
  .readFileSync("./everybody_codes_e2024_q3_p2.txt", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(""));

const result = [];

function isBorder(x, y, blank) {
  if (x > 0 && grid[x - 1][y] === blank) {
    return true;
  }
  if (x < grid.length - 1 && grid[x + 1][y] === blank) {
    return true;
  }
  if (y > 0 && grid[x][y - 1] === blank) {
    return true;
  }
  if (y < grid[0].length - 1 && grid[x][y + 1] === blank) {
    return true;
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

// console.log(result);
// console.log(grid.map((x) => x.join("")).join("\n"));

console.log(finalResult);
