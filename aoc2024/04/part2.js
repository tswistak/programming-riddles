const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(""));

const coords = [
  [0, 0, ["M", "S", "S", "M"]],
  [2, 0, ["S", "M", "S", "M"]],
  [1, 1, ["A", "A", "A", "A"]],
  [0, 2, ["M", "S", "M", "S"]],
  [2, 2, ["S", "M", "M", "S"]],
];

function check(x, y) {
  const correct = new Set([0, 1, 2, 3]);
  for (const [xDir, yDir, letters] of coords) {
    const i = x + xDir;
    const j = y + yDir;
    if (i < 0 || j < 0 || i >= input.length || j >= input[i].length) {
      return false;
    }
    letters.forEach((letter, index) => {
      if (letter !== input[i][j]) {
        correct.delete(index);
      }
    });
  }
  return correct.size > 0;
}

let found = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === "M" || input[i][j] === "S") {
      if (check(i, j)) {
        found++;
      }
    }
  }
}

console.log(found);
