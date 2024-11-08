const fs = require("fs");

const nails = fs
  .readFileSync("./everybody_codes_e2024_q4_p3.txt", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => Number(x));

nails.sort((a, b) => a - b);
const median = nails[Math.trunc(nails.length / 2)];
const strikes = nails.reduce(
  (prev, curr, i) => prev + Math.abs(curr - median),
  0,
);

console.log(strikes);
