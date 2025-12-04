const fs = require("fs");

const input = fs
  .readFileSync("input_p2", "utf-8")
  // .readFileSync("sample", "utf-8")
  .trim()
  .split("\n");

const names = input[0].split(",");
const moves = input[2].split(",");

let currentIndex = 0;

for (const move of moves) {
  const [direction, value] = [move[0], parseInt(move.slice(1))];
  if (direction === "R") {
    currentIndex = (currentIndex + value) % names.length;
  } else if (direction === "L") {
    currentIndex = (currentIndex - value + names.length) % names.length;
  }
}

const name = names[currentIndex];

console.log({ name });
