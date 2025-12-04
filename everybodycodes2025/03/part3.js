const fs = require("fs");

const input = fs
  .readFileSync("input_p3", "utf-8")
  // .readFileSync("sample_p3", "utf-8")
  .trim()
  .split(",")
  .map(Number);

const result = Math.max(
  ...Object.values(Object.groupBy(input, (x) => x)).map(
    (group) => group.length,
  ),
);

console.log({ result });
