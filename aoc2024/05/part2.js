const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n");

const beforeCurrent = new Map();
const afterCurrent = new Map();
const toPrint = [];

function addToMap(key, value, map) {
  const set = new Set(map.get(key) ?? []);
  set.add(value);
  map.set(key, set);
}

let parsingRules = true;
for (const line of input) {
  if (line.trim() === "") {
    parsingRules = false;
  } else if (parsingRules) {
    const [before, after] = line.split("|").map(Number);
    addToMap(before, after, afterCurrent);
    addToMap(after, before, beforeCurrent);
  } else {
    const pages = line.split(",").map(Number);
    toPrint.push(pages);
  }
}

const incorrectUpdates = [];

mainLoop: for (const line of toPrint) {
  for (let i = 0; i < line.length; i++) {
    const current = line[i];
    const toBeBefore = beforeCurrent.get(current) || new Set();
    const toBeAfter = afterCurrent.get(current) || new Set();
    const numbersBefore = new Set(line.slice(0, i));
    const numbersAfter = new Set(line.slice(i + 1));
    const wrongBefore = toBeBefore.intersection(numbersAfter);
    const wrongAfter = toBeAfter.intersection(numbersBefore);
    if (wrongBefore.size > 0 || wrongAfter.size > 0) {
      incorrectUpdates.push(line);
      continue mainLoop;
    }
  }
}

let result = 0;

for (const update of incorrectUpdates) {
  for (let i = 0; i < update.length; i++) {
    update.sort((a, b) => {
      const toBeBefore = beforeCurrent.get(a) || new Set();
      const toBeAfter = afterCurrent.get(a) || new Set();

      if (toBeBefore.has(b)) return -1;
      if (toBeAfter.has(b)) return 1;
      return 0;
    });
  }
  result += update[Math.trunc(update.length / 2)];
}

console.log(result);
