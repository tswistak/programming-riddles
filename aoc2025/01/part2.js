const fs = require("fs");

const input = fs.readFileSync("./input", "utf8").trim().split("\n");
// const input = fs.readFileSync("./sample", "utf8").trim().split("\n");

let current = 50;
const MOD = 100;
let zeroHits = 0;

for (const line of input) {
  const change = parseInt(line.slice(1), 10);
  if (line[0] === "R") {
    zeroHits += Math.floor((current + change) / MOD);
    current = (current + change) % MOD;
  } else {
    if (current === 0) {
      zeroHits += Math.floor(change / MOD);
    } else if (change >= current) {
      zeroHits += Math.floor((change - current) / MOD) + 1;
    }
    current = (current - (change % MOD) + MOD) % MOD;
  }
}

console.log({ current, zeroHits });
