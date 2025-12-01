const fs = require("fs");

const input = fs.readFileSync("./input", "utf8").trim().split("\n");
// const input = fs.readFileSync("./sample", "utf8").trim().split("\n");

let current = 50;
const MOD = 100;
let zeroHits = 0;

for (const line of input) {
  const change = parseInt(line.slice(1), 10);
  if (line[0] === "R") {
    current = (current + change) % MOD;
  } else {
    current = (current - change + MOD) % MOD;
  }
  if (current === 0) {
    zeroHits += 1;
  }
}

console.log({ current, zeroHits });
