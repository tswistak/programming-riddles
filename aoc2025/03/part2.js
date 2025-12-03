const fs = require("fs");

const input = fs
  .readFileSync("./input", "utf8")
  // .readFileSync("./sample", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

function maxSubsequence(arr, k) {
  const n = arr.length;
  const stack = [];
  for (let i = 0; i < n; i++) {
    const c = arr[i];
    while (
      stack.length > 0 &&
      stack[stack.length - 1] < c &&
      stack.length - 1 + (n - i) >= k
    ) {
      stack.pop();
    }

    if (stack.length < k) stack.push(c);
  }
  return stack.slice(0, k);
}

let sum = 0n;

for (const bank of input) {
  const best = maxSubsequence(bank, 12);
  const value = BigInt(best.join(""));
  sum += value;
}

console.log({ sum });
