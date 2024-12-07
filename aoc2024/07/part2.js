const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => {
    const [test, rest] = x.split(":");
    const values = rest.split(" ").filter(Boolean).map(Number);

    return { test: Number(test), values };
  });

function build(current, rest) {
  let maxLevel = 0;
  function buildRec(current, rest, currLevel = 0) {
    if (rest.length) {
      const [newCur, ...newRest] = rest;
      maxLevel = Math.max(maxLevel, currLevel);
      return [
        buildRec([...current, "+", newCur], newRest, currLevel + 1),
        buildRec([...current, "*", newCur], newRest, currLevel + 1),
        buildRec([...current, "||", newCur], newRest, currLevel + 1),
      ];
    } else {
      return current;
    }
  }
  return buildRec(current, rest).flat(maxLevel);
}

function compute(arr) {
  let result = arr[0];
  for (let i = 2; i < arr.length; i += 2) {
    const operator = arr[i - 1];
    const val = arr[i];
    if (operator === "+") {
      result += val;
    } else if (operator === "*") {
      result *= val;
    } else {
      result = Number(`${result}${val}`);
    }
  }
  return result;
}

let passing = 0;

for (const { test, values } of input) {
  const [initial, ...rest] = values;
  const toTest = build([initial], rest);
  if (toTest.some((x) => compute(x) === test)) {
    passing += test;
  }
}

console.log(passing);
