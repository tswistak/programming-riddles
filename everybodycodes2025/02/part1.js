const fs = require("fs");

const input = fs
  .readFileSync("input_p1", "utf-8")
  // .readFileSync("sample_p1", "utf-8")
  .trim();

const [_, a, b] = input.match(/(\d+),(\d+)/).map(Number);
const A = [a, b];

const add = (first, second) => [first[0] + second[0], first[1] + second[1]];
const mul = (first, second) => [
  first[0] * second[0] - first[1] * second[1],
  first[0] * second[1] + first[1] * second[0],
];
const div = (first, second) => [
  Math.trunc(first[0] / second[0]),
  Math.trunc(first[1] / second[1]),
];

const doCycle = (startValue) => {
  const multiplied = mul(startValue, startValue);
  const divided = div(multiplied, [10, 10]);
  const sum = add(divided, A);
  return sum;
};

let result = [0, 0];
for (let i = 0; i < 3; i++) {
  result = doCycle(result);
}

console.log({ result });
