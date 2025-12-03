const fs = require("fs");

const input = fs.readFileSync("./input", "utf8").trim().split(",");
// const input = fs.readFileSync("./sample", "utf8").trim().split(",");

const chunkArray = (arr, size) =>
  arr.reduce((res, _, idx) => {
    if (idx % size === 0) res.push(arr.slice(idx, idx + size));
    return res;
  }, []);

let sum = 0n;

for (const range of input) {
  const [start, end] = range.split("-").map((x) => parseInt(x, 10));
  for (let i = start; i <= end; i++) {
    const str = i.toString();
    let lastSequence = str[0];
    for (let j = 1; j < str.length; j++) {
      const rest = str.slice(j).split("");
      const restSeq = chunkArray(rest, lastSequence.length);
      if (restSeq.every((seq) => seq.join("") === lastSequence)) {
        sum += BigInt(i);
        break;
      } else {
        lastSequence += str[j];
        if (lastSequence.length > rest.length) {
          break;
        }
      }
    }
  }
}

console.log({ sum });
