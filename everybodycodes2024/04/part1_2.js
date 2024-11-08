const fs = require("fs");

const nails = fs
  // .readFileSync("./everybody_codes_e2024_q4_p1.txt", {
  .readFileSync("./everybody_codes_e2024_q4_p2.txt", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => parseInt(x));

const shortest = Math.min(...nails);
const strikes = nails.reduce((prev, curr) => prev + (curr - shortest), 0);

console.log(strikes);
