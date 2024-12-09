// works only for sample data, too high result for input
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

let j = disk.length - 1;
let currentId = null;
let currentStart = null;
while (j >= 0) {
  const current = disk[j];
  if (currentId == null) {
    if (current != null) {
      currentId = current.id;
      currentStart = j;
    }
  }
  if (
    (current == null && currentId != null) ||
    (current && currentId !== current.id)
  ) {
    let i = 0;
    let emptyStart = null;
    while (i < disk.length && i < j) {
      const currLeft = disk[i];
      if (emptyStart == null) {
        if (currLeft == null) {
          emptyStart = i;
        }
      }
      if (emptyStart != null && currLeft != null) {
        const length = i - emptyStart;
        const neededLength = currentStart - j;
        if (neededLength <= length) {
          for (let k = emptyStart; k < emptyStart + neededLength; k++) {
            disk[k] = { id: currentId };
          }
          for (let k = currentStart; k > j; k--) {
            disk[k] = null;
          }
          currentId = null;
          currentStart = null;
          break;
        }
        emptyStart = null;
      }
      i++;
    }
    currentId = null;
  }

  if (current == null || currentId === current.id) {
    j--;
  }
}

const sum = disk.reduce((acc, curr, i) => {
  if (curr == null) {
    return acc;
  }
  return acc + i * curr.id;
}, 0);

console.log(sum);
