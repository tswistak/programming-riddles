const fs = require("fs");

const input = fs
  .readFileSync("input_p1", "utf-8")
  // .readFileSync("sample", "utf-8")
  .trim()
  .split("\n");

const names = input[0].split(",");
const moves = input[2].split(",");

let currentIndex = 0;

for (const move of moves) {
  const [direction, value] = [move[0], parseInt(move[1])];
  if (direction === "R") {
    currentIndex = Math.min(currentIndex + value, names.length - 1);
  } else if (direction === "L") {
    currentIndex = Math.max(currentIndex - value, 0);
  }
}

const name = names[currentIndex];

console.log({ name });
