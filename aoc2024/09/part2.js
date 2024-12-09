const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("")
  .map(Number);

const disk = [];
const holes = [];
let last = 0;
for (let i = 0; i < input.length; i++) {
  const current = input[i];
  if (i % 2 === 0) {
    disk.push({ id: i / 2, start: last, length: current });
  } else {
    holes.push({ start: last, length: current });
  }
  last += current;
}

disk.reverse();

for (const data of disk) {
  for (let i = 0; i < holes.length; i++) {
    const current = holes[i];
    if (current.start > data.start) {
      break;
    }
    if (current.length >= data.length) {
      data.start = current.start;
      current.length -= data.length;
      current.start += data.length;
      break;
    }
  }
}

disk.sort((a, b) => a.start - b.start);

const sum = disk.reduce((acc, curr) => {
  for (let i = curr.start; i < curr.length + curr.start; i++) {
    acc += curr.id * i;
  }
  return acc;
}, 0);

console.log(sum);
