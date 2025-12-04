const fs = require("fs");

const input = fs
  .readFileSync("input_p1", "utf-8")
  // .readFileSync("sample_p1", "utf-8")
  .trim()
  .split(",")
  .map(Number);

const result = [...new Set(input)]
  .toSorted((a, b) => a - b)
  .reduce((acc, curr) => acc + curr, 0);

console.log({ result });
