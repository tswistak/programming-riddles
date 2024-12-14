const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => {
    const [, px, py, vx, vy] = x
      .match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)
      .map(Number);
    return { px, py, vx, vy };
  });

function mod(a, b) {
  var r = a % b;
  if ((r > 0 && b < 0) || (r < 0 && b > 0)) {
    r = r + b;
  }
  return r;
}

// commented values are for sample values
const X_LIMIT = 101;
// const X_LIMIT = 11;
const Y_LIMIT = 103;
// const Y_LIMIT = 7;

const TOP_LEFT = {
  x1: 0,
  x2: Math.floor(X_LIMIT / 2) - 1,
  y1: 0,
  y2: Math.floor(Y_LIMIT / 2) - 1,
};
const TOP_RIGHT = {
  x1: Math.ceil(X_LIMIT / 2),
  x2: X_LIMIT - 1,
  y1: 0,
  y2: Math.floor(Y_LIMIT / 2) - 1,
};
const BOTTOM_LEFT = {
  x1: 0,
  x2: Math.floor(X_LIMIT / 2) - 1,
  y1: Math.ceil(Y_LIMIT / 2),
  y2: Y_LIMIT - 1,
};
const BOTTOM_RIGHT = {
  x1: Math.ceil(X_LIMIT / 2),
  x2: X_LIMIT - 1,
  y1: Math.ceil(Y_LIMIT / 2),
  y2: Y_LIMIT - 1,
};

const ITERATIONS = 100;

let topLeft = 0;
let topRight = 0;
let bottomLeft = 0;
let bottomRight = 0;

for (const { px, py, vx, vy } of input) {
  let x = px;
  let y = py;
  for (let i = 0; i < ITERATIONS; i++) {
    x = mod(x + vx, X_LIMIT);
    y = mod(y + vy, Y_LIMIT);
  }
  if (
    x >= TOP_LEFT.x1 &&
    x <= TOP_LEFT.x2 &&
    y >= TOP_LEFT.y1 &&
    y <= TOP_LEFT.y2
  ) {
    topLeft++;
  } else if (
    x >= TOP_RIGHT.x1 &&
    x <= TOP_RIGHT.x2 &&
    y >= TOP_RIGHT.y1 &&
    y <= TOP_RIGHT.y2
  ) {
    topRight++;
  } else if (
    x >= BOTTOM_LEFT.x1 &&
    x <= BOTTOM_LEFT.x2 &&
    y >= BOTTOM_LEFT.y1 &&
    y <= BOTTOM_LEFT.y2
  ) {
    bottomLeft++;
  } else if (
    x >= BOTTOM_RIGHT.x1 &&
    x <= BOTTOM_RIGHT.x2 &&
    y >= BOTTOM_RIGHT.y1 &&
    y <= BOTTOM_RIGHT.y2
  ) {
    bottomRight++;
  }
}

const result = topLeft * topRight * bottomLeft * bottomRight;

console.log(topLeft, topRight, bottomLeft, bottomRight);
console.log(result);
