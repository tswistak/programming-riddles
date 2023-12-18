const fs = require("fs");

function parseDirection(direction) {
  switch (direction) {
    case "R":
      return [0, 1];
    case "L":
      return [0, -1];
    case "U":
      return [-1, 0];
    case "D":
      return [1, 0];
    default:
      return null;
  }
}

function parseData(data) {
  const result = [];
  for (const line of data) {
    const [direction, count, color] = line.split(" ");
    result.push({
      direction: parseDirection(direction),
      color: color.replace("(", "").replace(")"),
      count: parseInt(count),
    });
  }
  return result;
}

function part1(data) {
  const instructions = parseData(data);
  // fill
  const grid = [[]];
  let currentI = 0;
  let currentJ = 0;
  for (const { direction, count } of instructions) {
    for (let i = 0; i < count; i++) {
      currentI += direction[0];
      currentJ += direction[1];
      if (!grid[currentI]) {
        grid[currentI] = [];
      }
      const line = grid[currentI];
      line[currentJ] = true;
    }
  }
  // count
  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    let inside = false;
    let isStraightLine = false;
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        if (!isStraightLine && j < grid[i].length - 1 && grid[i][j + 1]) {
          isStraightLine = true;
        } else if (
          isStraightLine &&
          j < grid[i].length - 1 &&
          !grid[i][j + 1]
        ) {
          isStraightLine = false;
          for (let k = j + 1; k < grid[i].length; k++) {
            if (grid[i][k]) {
              inside = true;
              break;
            }
          }
        } else {
          inside = !inside;
        }
        sum++;
      } else if (inside) {
        sum++;
      }
    }
  }
  return sum;
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
console.log(part1(realData)); // wrong result
console.log(part2(testData));
console.log(part2(realData));
