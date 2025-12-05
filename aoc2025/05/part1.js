const fs = require("fs");

const input = fs
  .readFileSync("input", "utf-8")
  // .readFileSync("sample", "utf-8")
  .trim()
  .split("\n");

const ranges = [];
let freshCount = 0;
let isCountingRanges = true;

for (const line of input) {
  if (line.trim() === "") {
    isCountingRanges = false;
    continue;
  }
  if (isCountingRanges) {
    const [start, end] = line.split("-").map(BigInt);
    ranges.push([start, end]);
  } else {
    const id = BigInt(line);
    for (const [start, end] of ranges) {
      if (id >= start && id <= end) {
        freshCount++;
        break;
      }
    }
  }
}

console.log({ freshCount });
