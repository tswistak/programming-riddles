const fs = require("fs");

const input = fs
  .readFileSync("input_p2", "utf-8")
  // .readFileSync("sample_p2", "utf-8")
  .trim()
  .split(",")
  .map(Number);

const result = [...new Set(input)]
  .toSorted((a, b) => a - b)
  .slice(0, 20)
  .reduce((acc, curr) => acc + curr, 0);

console.log({ result });
