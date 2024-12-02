const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(" ").map(Number));

function isSafe(report) {
  let direction = null;
  let failed = false;
  for (let i = 1; i < report.length; i++) {
    const prev = report[i - 1];
    const curr = report[i];
    const diff = prev - curr;
    if (diff === 0) {
      failed = true;
      break;
    }
    if (direction == null) {
      direction = Math.sign(diff);
    } else if (direction !== Math.sign(diff)) {
      failed = true;
      break;
    }
    if (Math.abs(diff) > 3) {
      failed = true;
      break;
    }
  }
  return !failed;
}

let safe = 0;

for (const report of input) {
  if (isSafe(report)) {
    safe++;
  } else {
    for (let i = 0; i < report.length; i++) {
      const newReport = report.toSpliced(i, 1);
      if (isSafe(newReport)) {
        safe++;
        break;
      }
    }
  }
}

console.log(safe);
