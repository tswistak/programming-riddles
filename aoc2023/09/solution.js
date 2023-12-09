const fs = require("fs");

function parseData(data) {
  return data.map((x) => x.split(" ").map((x) => parseInt(x)));
}

function part1(data) {
  const history = parseData(data);
  let result = 0;
  for (const entry of history) {
    const diffs = [entry];
    let onlyZero = false;
    while (!onlyZero) {
      const current = diffs.at(-1);
      const newDiff = [];
      onlyZero = true;
      for (let i = 1; i < current.length; i++) {
        const result = current[i] - current[i - 1];
        if (result !== 0) {
          onlyZero = false;
        }
        newDiff.push(result);
      }
      diffs.push(newDiff);
    }
    let newNumber = 0;
    for (let i = diffs.length - 2; i >= 0; i--) {
      newNumber += diffs[i].at(-1);
    }
    result += newNumber;
  }
  return result;
}

function part2(data) {
  const history = parseData(data);
  let result = 0;
  for (const entry of history) {
    const diffs = [entry];
    let onlyZero = false;
    while (!onlyZero) {
      const current = diffs.at(-1);
      const newDiff = [];
      onlyZero = true;
      for (let i = 1; i < current.length; i++) {
        const result = current[i] - current[i - 1];
        if (result !== 0) {
          onlyZero = false;
        }
        newDiff.push(result);
      }
      diffs.push(newDiff);
    }
    let newNumber = 0;
    for (let i = diffs.length - 2; i >= 0; i--) {
      newNumber = diffs[i][0] - newNumber;
    }
    result += newNumber;
  }
  return result;
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
