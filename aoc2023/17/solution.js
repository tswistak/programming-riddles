const fs = require("fs");

function parseData(data) {
  return data.map((x) => x.split("").map((y) => parseInt(y)));
}

function part1(data) {
  const grid = parseData(data);
  //
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
console.log(part2(testData));
console.log(part2(realData));
