const fs = require("fs");

function parseGame(game) {
  const [match, id] = game.match(/Game (\d+):/);
  const unparsedCubeSets = game.replace(match, "").split(";");
  const cubeSets = [];
  for (const cubeSet of unparsedCubeSets) {
    const result = {
      blue: 0,
      red: 0,
      green: 0,
    };
    const split = cubeSet.split(",").map((x) => x.trim());
    for (const gems of split) {
      const [value, key] = gems.split(" ");
      result[key] = parseInt(value);
    }
    cubeSets.push(result);
  }
  return {
    id: parseInt(id),
    cubeSets,
  };
}

function part1(data) {
  let sum = 0;
  const maxValues = {
    red: 12,
    green: 13,
    blue: 14,
  };
  for (const game of data) {
    const { id, cubeSets } = parseGame(game);
    let invalid = false;
    for (const cubeSet of cubeSets) {
      if (
        cubeSet.red > maxValues.red ||
        cubeSet.green > maxValues.green ||
        cubeSet.blue > maxValues.blue
      ) {
        invalid = true;
        break;
      }
    }
    if (!invalid) {
      sum += id;
    }
  }
  return sum;
}

function part2(data) {
  let sum = 0;
  for (const game of data) {
    const { cubeSets } = parseGame(game);
    let maxRed = 0;
    let maxBlue = 0;
    let maxGreen = 0;
    for (const cubeSet of cubeSets) {
      if (cubeSet.red > maxRed) {
        maxRed = cubeSet.red;
      }
      if (cubeSet.blue > maxBlue) {
        maxBlue = cubeSet.blue;
      }
      if (cubeSet.green > maxGreen) {
        maxGreen = cubeSet.green;
      }
    }
    sum += maxBlue * maxGreen * maxRed;
  }
  return sum;
}

const testData = fs
  .readFileSync("./test.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

console.log(part1(testData));
console.log(part1(realData));
console.log(part2(testData));
console.log(part2(realData));
