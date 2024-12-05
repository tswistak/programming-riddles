const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(""));

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];

function check(x, y, xDir, yDir) {
  let i = x;
  let j = y;
  for (const letter of "XMAS".split("")) {
    if (i < 0 || j < 0 || i >= input.length || j >= input[i].length) {
      return false;
    }
    if (letter !== input[i][j]) {
      return false;
    }
    i += xDir;
    j += yDir;
  }
  return true;
}

let found = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === "X") {
      for (const [xDir, yDir] of directions) {
        if (check(i, j, xDir, yDir)) {
          found++;
        }
      }
    }
  }
}

console.log(found);
