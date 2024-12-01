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

const distance = first.reduce((acc, curr, i) => {
  const secondVal = second[i];
  const dist = Math.abs(curr - secondVal);
  return acc + dist;
}, 0);

console.log(distance);
