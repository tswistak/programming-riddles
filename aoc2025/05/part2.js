const fs = require("fs");

const input = fs
  .readFileSync("input", "utf-8")
  // .readFileSync("sample", "utf-8")
  .trim()
  .split("\n");

let ranges = [];

for (const line of input) {
  if (line.trim() === "") break;

  const [start, end] = line.split("-").map(BigInt);
  ranges.push([start, end]);
}

ranges.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));

let merged = [];
let [curStart, curEnd] = ranges[0];

for (let i = 1; i < ranges.length; i++) {
  const [s, e] = ranges[i];
  if (s <= curEnd + 1n) {
    if (e > curEnd) curEnd = e;
  } else {
    merged.push([curStart, curEnd]);
    curStart = s;
    curEnd = e;
  }
}
merged.push([curStart, curEnd]);

let result = 0n;
for (const [s, e] of merged) {
  result += e - s + 1n;
}

console.log({ result });
