const fs = require("fs");

const input = fs
  .readFileSync("input_p3", "utf-8")
  // .readFileSync("sample_p3", "utf-8")
  .trim()
  .split("\n");

const names = input[0].split(",");
const moves = input[2].split(",");

for (const move of moves) {
  const [direction, value] = [move[0], parseInt(move.slice(1))];
  let currentIndex = 0;
  if (direction === "R") {
    currentIndex = (currentIndex + value) % names.length;
  } else if (direction === "L") {
    currentIndex = (currentIndex - value + names.length) % names.length;
  }
  const tmp = names[0];
  names[0] = names[currentIndex];
  names[currentIndex] = tmp;
}

const name = names[0];

console.log({ name });
