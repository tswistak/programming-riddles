const fs = require("fs");

const input = fs
  .readFileSync("./input", "utf8")
  // .readFileSync("./sample", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let sum = 0;

for (const bank of input) {
  let max = 0;
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const value = parseInt(bank[i] + bank[j], 10);
      if (value > max) {
        max = value;
      }
    }
  }
  sum += max;
}

console.log({ sum });
