const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split(" ");

let valueCounts = new Map();

for (const val of input) {
  valueCounts.set(val, (valueCounts.get(val) || 0n) + 1n);
}

for (let i = 0; i < 75; i++) {
  const newCounts = new Map();
  for (const [value, count] of valueCounts.entries()) {
    if (value === "0") {
      newCounts.set("1", (newCounts.get("1") || 0n) + count);
    } else if (value.length % 2 === 0) {
      const mid = value.length / 2;
      const a = String(Number(value.slice(0, mid)));
      const b = String(Number(value.slice(mid)));
      newCounts.set(a, (newCounts.get(a) || 0n) + count);
      newCounts.set(b, (newCounts.get(b) || 0n) + count);
    } else {
      const newVal = String(BigInt(value) * 2024n);
      newCounts.set(newVal, (newCounts.get(newVal) || 0n) + count);
    }
  }
  valueCounts = newCounts;
}

const result = [...valueCounts.values()].reduce((acc, curr) => acc + curr, 0n);
console.log(result);
