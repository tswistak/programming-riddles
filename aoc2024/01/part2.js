const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(" ").filter(Boolean).map(Number));

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

const [first, second] = transpose(input);

first.sort((a, b) => a - b);
second.sort((a, b) => a - b);

const secondCounts = Object.groupBy(second, (x) => x);

const score = first.reduce((acc, curr) => {
  const count = secondCounts[curr]?.length ?? 0;
  const x = curr * count;
  return acc + x;
}, 0);

console.log(score);
