const fs = require("fs");

const input = fs.readFileSync("./input", "utf8").trim().split(",");
// const input = fs.readFileSync("./sample", "utf8").trim().split(",");

let sum = 0n;

for (const range of input) {
  const [start, end] = range.split("-").map((x) => parseInt(x, 10));
  for (let i = start; i <= end; i++) {
    const str = i.toString();
    if (str.length % 2 === 0) {
      const firstPart = str.slice(0, str.length / 2);
      const secondPart = str.slice(str.length / 2);
      if (firstPart === secondPart) {
        sum += BigInt(i);
      }
    }
  }
}

console.log({ sum });
