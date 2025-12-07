const fs = require("fs");

const input = fs
  .readFileSync("input", "utf-8")
  // .readFileSync("sample", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let startPosition = [0, 0];

for (let col = 0; col < input.length; col++) {
  for (let row = 0; row < input[col].length; row++) {
    if (input[col][row] === "S") {
      startPosition = [row, col];
      break;
    }
  }
}

const travel = (x, y) => {
  while (y < input.length - 1) {
    y++;
    const cell = input[y][x];
    if (cell === "^") {
      return [x, y];
    }
  }
  return null;
};

let splits = 0;
const seenSplits = new Set();
const startPositions = new Set([JSON.stringify(startPosition)]);
const allStartPositions = new Set([JSON.stringify(startPosition)]);

while (startPositions.size > 0) {
  const currentPosition = startPositions.values().next().value;
  const [currentRow, currentCol] = JSON.parse(currentPosition);
  startPositions.delete(currentPosition);
  const result = travel(currentRow, currentCol);
  if (result != null) {
    const left = JSON.stringify([result[0] - 1, result[1]]);
    const right = JSON.stringify([result[0] + 1, result[1]]);
    if (!allStartPositions.has(left)) {
      startPositions.add(left);
      allStartPositions.add(left);
    }
    if (!allStartPositions.has(right)) {
      startPositions.add(right);
      allStartPositions.add(right);
    }
    const coord = JSON.stringify(result);
    if (!seenSplits.has(coord)) {
      seenSplits.add(coord);
      splits += 1;
    }
  }
}

console.log({ splits });
