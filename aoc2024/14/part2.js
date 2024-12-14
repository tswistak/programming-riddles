const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x, i) => {
    const [, px, py, vx, vy] = x
      .match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)
      .map(Number);
    return { id: i, px, py, vx, vy };
  });

function mod(a, b) {
  var r = a % b;
  if ((r > 0 && b < 0) || (r < 0 && b > 0)) {
    r = r + b;
  }
  return r;
}

function variance(arr) {
  const mean = arr.reduce((acc, x) => acc + x, 0) / arr.length;
  return arr.reduce((acc, x) => acc + (x - mean) ** 2, 0) / arr.length;
}

function gcd(a, b) {
  if (a === 0) {
    return [b, 0, 1];
  }
  const [gcd, x1, y1] = gcd(b % a, a);
  const x = y1 - Math.floor(b / a) * x1;
  const y = x1;
  return [gcd, x, y];
}

function modInverse(a, m) {
  a = ((a % m) + m) % m;
  const [, x] = gcd(a, m);
  return ((x % m) + m) % m;
}

function chineseRemainderTheorem(a1, m1, a2, m2) {
  const result = a1 + m1 * mod(modInverse(m1, m2) * (a2 - a1), m2);
  return mod(result, m1 * m2);
}

const X_LIMIT = 101;
const Y_LIMIT = 103;

const positions = new Map(
  input.map(({ id, px, py }) => [id, { x: px, y: py }]),
);

let minXVar = Infinity;
let minX = -1;
let minYVar = Infinity;
let minY = -1;

for (let i = 0; i < Math.max(X_LIMIT, Y_LIMIT); i++) {
  for (const { id, vx, vy } of input) {
    let x = positions.get(id).x;
    let y = positions.get(id).y;
    x = mod(x + vx, X_LIMIT);
    y = mod(y + vy, Y_LIMIT);
    positions.set(id, { x, y });
  }

  const arrX = Array.from(positions.values(), ({ x }) => x);
  const arrY = Array.from(positions.values(), ({ y }) => y);

  const varX = variance(arrX);
  const varY = variance(arrY);

  if (varX < minXVar) {
    minXVar = varX;
    minX = i;
  }
  if (varY < minYVar) {
    minYVar = varY;
    minY = i;
  }
}

const result = chineseRemainderTheorem(minX, X_LIMIT, minY, Y_LIMIT);

console.log(minX, minY);
console.log(result);
