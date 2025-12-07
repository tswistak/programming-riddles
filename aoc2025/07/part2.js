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

const rows = input.length;
const cols = input[0].length;
const nextSplit = Array.from({ length: rows }, () => Array(cols).fill(-1));
for (let x = 0; x < cols; x++) {
  let nearest = -1;
  for (let y = rows - 1; y >= 0; y--) {
    if (input[y][x] === "^") nearest = y;
    nextSplit[y][x] = nearest > y ? nearest : -1;
  }
}

const timelines = new Map();
const countTimelines = (x, y) => {
  const k = x + "," + y;
  if (timelines.has(k)) {
    return timelines.get(k);
  }
  const ns = nextSplit[y][x];
  if (ns === -1) {
    timelines.set(k, 1n);
    return 1n;
  }
  const left = countTimelines(x - 1, ns);
  const right = countTimelines(x + 1, ns);
  const total = left + right;
  timelines.set(k, total);
  return total;
};

const result = countTimelines(startPosition[0], startPosition[1]);
console.log({ result });
