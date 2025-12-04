const fs = require("fs");

const input = fs
  .readFileSync("input_p3", "utf-8")
  // .readFileSync("sample_p3", "utf-8")
  .trim();

const [_, a, b] = input.match(/(-?\d+),(-?\d+)/);
const A = [Number(a), Number(b)];

const add = (first, second) => [first[0] + second[0], first[1] + second[1]];
const mul = (first, second) => [
  first[0] * second[0] - first[1] * second[1],
  first[0] * second[1] + first[1] * second[0],
];
const div = (first, second) => [
  Math.trunc(first[0] / second[0]),
  Math.trunc(first[1] / second[1]),
];

const doCycle = (startValue, point) => {
  const multiplied = mul(startValue, startValue);
  const divided = div(multiplied, [100000, 100000]);
  const sum = add(divided, point);
  return sum;
};

const final = add(A, [1000, 1000]);
const pointDistance = 1;
const points = [];

for (let i = A[1]; i <= final[1]; i += pointDistance) {
  for (let j = A[0]; j <= final[0]; j += pointDistance) {
    const currentPoint = [j, i];
    let currentResult = [0, 0];
    let isValid = true;
    for (let cycle = 0; cycle < 100; cycle++) {
      currentResult = doCycle(currentResult, currentPoint);
      if (currentResult.some((x) => x > 1000000 || x < -1000000)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      points.push(currentPoint);
    }
  }
}

const result = points.length;

console.log({ result });
