const fs = require("fs");

const input = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const instructions = input.match(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g);

let sum = 0;
let canWork = true;
for (const command of instructions) {
  if (command.startsWith("don")) {
    canWork = false;
  } else if (command.startsWith("do")) {
    canWork = true;
  } else if (canWork) {
    const [a, b] = command.match(/(\d+)/g).map(Number);
    sum += a * b;
  }
}

console.log(sum);
