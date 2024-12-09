const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("")
  .map(Number);

const disk = [];

for (let i = 0; i < input.length; i++) {
  const current = input[i];
  for (let j = 0; j < current; j++) {
    if (i % 2 === 0) {
      disk.push({ id: i / 2 });
    } else {
      disk.push(null);
    }
  }
}

let i = 0;
let j = disk.length - 1;

while (i < j) {
  if (disk[i] != null) {
    i++;
  }
  if (disk[j] == null) {
    j--;
  }
  if (disk[i] == null && disk[j] != null) {
    disk[i] = disk[j];
    disk[j] = null;
  }
}

const sum = disk.reduce((acc, curr, i) => {
  if (curr == null) {
    return acc;
  }
  return acc + i * curr.id;
}, 0);

console.log(sum);
