const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(""));

let i, j;

outer: for (i = 0; i < input.length; i++) {
  for (j = 0; j < input[i].length; j++) {
    if (input[i][j] === "^") {
      break outer;
    }
  }
}

const directionChange = {
  "^": ">",
  ">": "v",
  v: "<",
  "<": "^",
};

const directionDiff = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

function isInBounds(i, j) {
  return i >= 0 && j >= 0 && i < input.length && j < input[i].length;
}

const visited = new Set([`${i},${j}`]);

while (true) {
  const current = input[i][j];
  const [iDiff, jDiff] = directionDiff[current];
  const [nextI, nextJ] = [i + iDiff, j + jDiff];
  if (!isInBounds(nextI, nextJ)) {
    break;
  }
  const next = input[nextI][nextJ];
  if (next === "#") {
    input[i][j] = directionChange[current];
  } else {
    input[i][j] = ".";
    i = nextI;
    j = nextJ;
    input[i][j] = current;
    visited.add(`${i},${j}`);
  }
}

console.log(visited.size);
