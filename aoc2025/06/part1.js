const fs = require("fs");

const input = fs
  .readFileSync("input", "utf-8")
  // .readFileSync("sample", "utf-8")
  .trim()
  .split("\n");

const numberRows = [];
const operators = [];

for (let i = 0; i < input.length; i++) {
  if (i === input.length - 1) {
    operators.push(
      ...input[i]
        .split("")
        .map((x) => x.trim())
        .filter(Boolean),
    );
  } else {
    numberRows.push(
      input[i]
        .split(" ")
        .map((x) => parseInt(x, 10))
        .filter((x) => !isNaN(x))
        .map(BigInt),
    );
  }
}

const results = [];

for (let i = 0; i < operators.length; i++) {
  const operator = operators[i];
  let result = numberRows[0][i];
  for (let j = 1; j < numberRows.length; j++) {
    const number = numberRows[j][i];
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
