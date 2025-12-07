const fs = require("fs");

const input = fs
  .readFileSync("input", "utf-8")
  // .readFileSync("sample", "utf-8")
  .split("\n");

const numberRows = [];
const operators = [];

const dataLines = input.slice(0, -1);
const operatorsLine = input[input.length - 1] || "";

const maxLen = Math.max(...dataLines.map((l) => l.length));
const padded = dataLines.map((l) => l.padEnd(maxLen, " "));

const isSeparator = new Array(maxLen).fill(false);
for (let pos = 0; pos < maxLen; pos++) {
  isSeparator[pos] = padded.every((line) => line[pos] === " ");
}

const ranges = [];
let inColumn = false;
let start = 0;
for (let pos = 0; pos < maxLen; pos++) {
  if (!isSeparator[pos] && !inColumn) {
    inColumn = true;
    start = pos;
  }
  if (isSeparator[pos] && inColumn) {
    ranges.push([start, pos - 1]);
    inColumn = false;
  }
}
if (inColumn) ranges.push([start, maxLen - 1]);

for (const line of padded) {
  numberRows.push(ranges.map(([s, e]) => line.slice(s, e + 1)));
}

const opLinePadded = operatorsLine.padEnd(maxLen, " ");
for (const [s, e] of ranges) {
  const op = opLinePadded.slice(s, e + 1).trim();
  if (op) operators.push(op);
}

const results = [];

for (let i = 0; i < operators.length; i++) {
  const operator = operators[i];
  const originalNumbers = [];
  for (let j = 0; j < numberRows.length; j++) {
    originalNumbers.push(numberRows[j][i]);
  }
  const newNumbers = [];
  for (let pos = originalNumbers[0].length - 1; pos >= 0; pos--) {
    let columnDigits = originalNumbers.map((x) => x[pos]);
    columnDigits = columnDigits.filter((x) => x !== "_");
    newNumbers.push(BigInt(columnDigits.join("")));
  }
  let result = newNumbers[0];
  for (let j = 1; j < newNumbers.length; j++) {
    const number = newNumbers[j];
    if (operator === "+") {
      result += number;
    } else if (operator === "*") {
      result *= number;
    }
  }
  results.push(result);
}

const result = results.reduce((acc, curr) => acc + curr, 0n);

console.log({ result });
