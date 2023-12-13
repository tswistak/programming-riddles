const { FibonacciHeap } = require("@tyriar/fibonacci-heap");
const fs = require("fs");

function parseLine(data) {
  const [pattern, sequence] = data.split(" ");
  const sequenceArray = sequence.split(",").map((x) => parseInt(x));

  return {
    pattern,
    sequence: sequenceArray,
  };
}

function testSequence(pattern, sequence) {
  const matches = pattern.match(/(#+)/g);
  if (!matches || matches.length !== sequence.length) {
    return false;
  }
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].length !== sequence[i]) {
      return false;
    }
  }
  return true;
}

function generatePossibilities(pattern) {
  let possibilities = [pattern];
  outer: while (true) {
    const newPossible = [];
    for (const variant of possibilities) {
      const var1 = variant.replace("?", ".");
      const var2 = variant.replace("?", "#");
      if (var1 === variant) {
        break outer;
      }
      newPossible.push(var1, var2);
    }
    possibilities = newPossible;
  }
  return possibilities;
}

function partialTest(pattern, sequence) {
  let currentCounter = 0;
  let currentSeq = -1;
  for (let i = 0; i < pattern.length; i++) {
    const currChar = pattern[i];
    const prevChar = pattern[i - 1];
    if (currChar === "?") {
      break;
    }
    if (currChar === "#" && (prevChar == null || prevChar === ".")) {
      currentSeq++;
    }
    if (currChar === "#") {
      currentCounter++;
    }
    if (
      (currChar === "." && prevChar === "#") ||
      (currChar === "#" && i === pattern.length - 1)
    ) {
      if (sequence[currentSeq] !== currentCounter) {
        return false;
      }
      currentCounter = 0;
    }
  }
  return true;
}

function findPossibilities(pattern, sequence) {
  let possibilities = new Set([pattern]);
  outer: while (true) {
    const newPossible = new Set();
    for (const variant of possibilities) {
      const var1 = variant.replace("?", ".");
      const var2 = variant.replace("?", "#");
      if (var1 === variant) {
        break outer;
      }
      if (partialTest(var1, sequence)) {
        newPossible.add(var1);
      }
      if (partialTest(var2, sequence)) {
        newPossible.add(var2);
      }
    }
    possibilities = newPossible;
    if (newPossible.size === 0) {
      break;
    }
  }
  return possibilities;
}

function part1(data) {
  let sum = 0;
  for (const line of data) {
    const { pattern, sequence } = parseLine(line);
    const possibilities = generatePossibilities(pattern);
    sum += new Set(possibilities.filter((x) => testSequence(x, sequence))).size;
  }
  return sum;
}

function part2(data) {
  let sum = 0;
  for (const line of data) {
    const { pattern, sequence } = parseLine(line);
    const newPattern = Array(5).fill(pattern).join("?");
    const newSequence = Array(5).fill(sequence).flat();
    const possibilities = findPossibilities(newPattern, newSequence);
    sum += [...possibilities].filter((x) =>
      testSequence(x, newSequence),
    ).length;
  }
  return sum;
}

const testData = fs
  .readFileSync("./test.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

console.log(part1(testData));
console.log(part1(realData));
console.log(part2(testData));
// console.log(part2(realData)); oom :(
