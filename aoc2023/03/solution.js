const fs = require("fs");

function isDigit(char) {
  return char >= "0" && char <= "9";
}

function isSymbol(char) {
  return char !== "." && char !== "\n" && !isDigit(char);
}

function part1(data) {
  let sum = 0;

  function checkAdjacent(row, col, length) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        for (let k = 0; k < length; k++) {
          const newRow = row + i;
          const newCol = col + j + k;
          if (
            newRow >= 0 &&
            newRow < data.length &&
            newCol >= 0 &&
            newCol < data[0].length
          ) {
            if (isSymbol(data[newRow][newCol])) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (isDigit(data[row][col])) {
        let endCol = col;
        while (endCol < data[row].length && isDigit(data[row][endCol])) {
          endCol++;
        }
        let numberLength = endCol - col;
        if (checkAdjacent(row, col, numberLength)) {
          sum += parseInt(data[row].substring(col, endCol));
        }
        col = endCol - 1;
      }
    }
  }

  return sum;
}

function part2(data) {
  let result = 0;

  function isDigit(char) {
    return char >= "0" && char <= "9";
  }

  function getNumber(row, col) {
    if (
      row < 0 ||
      row >= data.length ||
      col < 0 ||
      col >= data[row].length ||
      !isDigit(data[row][col])
    ) {
      return null;
    }
    let num = "";
    while (col >= 0 && isDigit(data[row][col])) {
      col--;
    }
    col++;
    while (col < data[row].length && isDigit(data[row][col])) {
      num += data[row][col++];
    }
    return parseInt(num);
  }

  function findGearRatio(row, col) {
    let partNumbers = new Set();
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const num = getNumber(row + i, col + j);
        if (num != null) {
          partNumbers.add(num);
        }
      }
    }
    if (partNumbers.size === 2) {
      const nums = Array.from(partNumbers);
      return nums[0] * nums[1];
    }
    return 0;
  }

  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (data[row][col] === "*") {
        result += findGearRatio(row, col);
      }
    }
  }

  return result;
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
console.log(part2(realData));
