const fs = require("fs");

function parseData(data) {
  return data.map((x) => x.split(""));
}

function rollNorth(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 1; j < grid.length - i; j++) {
      for (let k = 0; k < grid[j].length; k++) {
        const prevChar = grid[j - 1][k];
        const currChar = grid[j][k];
        if (currChar === "O" && prevChar === ".") {
          grid[j - 1][k] = "O";
          grid[j][k] = ".";
        }
      }
    }
  }
}

function rollSouth(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = grid.length - 2; j >= 0; j--) {
      for (let k = 0; k < grid[j].length; k++) {
        const nextChar = grid[j + 1][k];
        const currChar = grid[j][k];
        if (currChar === "O" && nextChar === ".") {
          grid[j + 1][k] = "O";
          grid[j][k] = ".";
        }
      }
    }
  }
}

function rollWest(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 1; j < grid[0].length; j++) {
      for (let k = 0; k < grid.length; k++) {
        const prevChar = grid[k][j - 1];
        const currChar = grid[k][j];
        if (currChar === "O" && prevChar === ".") {
          grid[k][j - 1] = "O";
          grid[k][j] = ".";
        }
      }
    }
  }
}

function rollEast(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = grid[0].length - 2; j >= 0; j--) {
      for (let k = 0; k < grid.length; k++) {
        const nextChar = grid[k][j + 1];
        const currChar = grid[k][j];
        if (currChar === "O" && nextChar === ".") {
          grid[k][j - 1] = "O";
          grid[k][j] = ".";
        }
      }
    }
  }
}

function getLoad(grid) {
  let sum = 0;
  for (let i = 0, j = grid.length; i < grid.length; i++, j--) {
    sum += grid[i].filter((x) => x === "O").length * j;
  }
  return sum;
}

function part1(data) {
  const grid = parseData(data);
  rollNorth(grid);
  return getLoad(grid);
}

function part2(data) {
  const grid = parseData(data);
  // yolo, todo
  for (let i = 0; i < 1000000000; i++) {
    i % 1000000 === 0 && console.log(i);
    rollNorth(grid);
    rollWest(grid);
    rollSouth(grid);
    rollEast(grid);
  }
  return getLoad(grid);
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
