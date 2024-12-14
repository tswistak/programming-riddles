const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => x.split(""));

const positions = new Map();

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const current = input[i][j];
    if (current !== ".") {
      positions.set(current, [
        ...(positions.get(current) ?? []),
        JSON.stringify([i, j]),
      ]);
    }
  }
}

function inBounds([i, j]) {
  return i >= 0 && j >= 0 && i < input.length && j < input[i].length;
}

const antinodes = new Set();

for (const [antenna, locations] of positions) {
  for (let i = 0; i < locations.length - 1; i++) {
    const first = JSON.parse(locations[i]);
    antinodes.add(JSON.stringify(first));
    for (let j = i + 1; j < locations.length; j++) {
      const second = JSON.parse(locations[j]);
      antinodes.add(JSON.stringify(second));
      const iDiff = second[0] - first[0];
      const jDiff = second[1] - first[1];
      let newFirst = [first[0] - iDiff, first[1] - jDiff];
      let newSecond = [second[0] + iDiff, second[1] + jDiff];
      while (inBounds(newFirst)) {
        antinodes.add(JSON.stringify(newFirst));
        newFirst = [newFirst[0] - iDiff, newFirst[1] - jDiff];
      }
      while (inBounds(newSecond)) {
        antinodes.add(JSON.stringify(newSecond));
        newSecond = [newSecond[0] + iDiff, newSecond[1] + jDiff];
      }
    }
  }
}

console.log(antinodes.size);