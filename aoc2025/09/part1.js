const fs = require("fs");

const input = fs
  .readFileSync("input", "utf-8")
  // .readFileSync("sample", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number));

let biggestArea = -Infinity;
let points = null;

for (let i = 0; i < input.length - 1; i++) {
  const point = input[i];
  for (let j = i + 1; j < input.length; j++) {
    const otherPoint = input[j];
    const area =
      (Math.abs(point[0] - otherPoint[0]) + 1) *
      (Math.abs(point[1] - otherPoint[1]) + 1);
    if (area > biggestArea) {
      biggestArea = area;
      points = [point, otherPoint];
    }
  }
}

console.log({ biggestArea, points });
