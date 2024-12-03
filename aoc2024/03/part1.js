const fs = require("fs");

const input = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const instructions = input.match(/mul\(\d+,\d+\)/g);

let sum = 0;
for (const mul of instructions) {
  const [a, b] = mul.match(/(\d+)/g).map(Number);
  sum += a * b;
}

console.log(sum);
