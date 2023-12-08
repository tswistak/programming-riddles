const fs = require("fs");

function parseData(data) {
  const moves = data[0].split("").map((x) => (x === "R" ? 1 : 0));

  const graph = {};

  for (let i = 2; i < data.length; i++) {
    const [key, tuple] = data[i].split(" = ");
    const [left, right] = tuple.replace("(", "").replace(")", "").split(", ");
    graph[key] = [left, right];
  }

  return { moves, graph };
}

function part1(data) {
  const { moves, graph } = parseData(data);

  let result = 0;
  let current = "AAA";
  while (current !== "ZZZ") {
    const i = result % moves.length;
    result++;
    current = graph[current][moves[i]];
  }
  return result;
}

function part2(data) {
  const { moves, graph } = parseData(data);
  const starters = [];
  const finishes = new Set();

  for (const node of Object.keys(graph)) {
    if (node.endsWith("A")) {
      starters.push(node);
    } else if (node.endsWith("Z")) {
      finishes.add(node);
    }
  }

  let results = [];
  for (const starter of starters) {
    let result = 0;
    let current = starter;
    while (current[2] !== "Z") {
      const i = result % moves.length;
      result++;
      current = graph[current][moves[i]];
    }
    results.push(result);
  }

  function gcd(a, b) {
    while (b != 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
  }

  function lcmForArray(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
      result = lcm(result, arr[i]);
    }
    return result;
  }

  return lcmForArray(results);
}

const test1Data = fs
  .readFileSync("./test1.txt", { encoding: "utf-8" })
  .split("\n");
const test2Data = fs
  .readFileSync("./test2.txt", { encoding: "utf-8" })
  .split("\n");
const test3Data = fs
  .readFileSync("./test3.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

console.log(part1(test1Data));
console.log(part1(test2Data));
console.log(part1(realData));
console.log(part2(test3Data));
console.log(part2(realData));
