const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(""));

let startI, startJ;

outer: for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === "^") {
      startI = i;
      startJ = j;
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

function test(map) {
  let [i, j] = [startI, startJ];
  const visited = new Set([`${i},${j}`]);
  let [loopI, loopJ] = [null, null];
  while (true) {
    const current = map[i][j];
    const [iDiff, jDiff] = directionDiff[current];
    const [nextI, nextJ] = [i + iDiff, j + jDiff];
    if (!isInBounds(nextI, nextJ)) {
      return false;
    }
    const next = map[nextI][nextJ];
    if (next === "#") {
      map[i][j] = directionChange[current];
    } else {
      map[i][j] = ".";
      i = nextI;
      j = nextJ;
      map[i][j] = current;
      if (!visited.has(`${i},${j}`)) {
        hasNew = true;
        loopI = null;
        loopJ = null;
      } else {
        if (loopI === i && loopJ === j) {
          return true;
        } else if (loopI == null && loopJ == null) {
          loopI = i;
          loopJ = j;
        }
      }
      visited.add(`${i},${j}`);
    }
  }
}

let possible = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if ((i === startI && j === startJ) || input[i][j] === "#") {
      continue;
    }
    console.log(i, j);
    const map = structuredClone(input);
    map[i][j] = "#";
    const result = test(map);
    if (result) {
      possible++;
    }
  }
}

console.log(possible);
