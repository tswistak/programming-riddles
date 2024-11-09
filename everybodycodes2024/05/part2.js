const fs = require("fs");

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function mod(a, b) {
  var r = a % b;
  if (r < 0) {
    if (b > 0) {
      r = r + b;
    } else {
      r = r - b;
    }
  }
  return r;
}

const clappers = transpose(
  // fs
  //   .readFileSync("./everybody_codes_e2024_q5_p2.txt", {
  //     encoding: "utf-8",
  //   })
  `2 3 4 5
6 7 8 9`
    .split("\n")
    .map((x) => x.split(" ").map((y) => parseInt(y))),
);

const results = [];
const resultsCounter = new Map();
let i = 0;
while (Math.max(...resultsCounter.values()) < 2024) {
  const currentCol = i % clappers.length;
  const currentClapper = clappers[currentCol].shift();
  let targetCol = (i + 1) % clappers.length;
  let direction = 1;
  let targetRow = -1;
  // TODO do poprawienia
  for (let j = 0; j < currentClapper; j++) {
    targetRow += direction;
    if (targetRow === clappers[targetCol].length || targetRow < 0) {
      targetCol = mod(targetCol + direction, clappers.length);
      direction = direction * -1;
      if (targetRow === -1) {
        targetRow++;
      }
    }
  }
  if (direction === -1) {
    clappers[targetCol].splice(targetRow + 1, 0, currentClapper);
  } else {
    clappers[targetCol].splice(targetRow, 0, currentClapper);
  }
  console.log(clappers);
  const result = transpose(clappers)[0].join(" ");
  results.push(results);
  resultsCounter.set(result, (resultsCounter.get(result) || 0) + 1);
  console.log(i, result, resultsCounter.get(result));
  i++;
}

console.log(results.at(-1), results.length + 1);
// console.log(Number(results.at(-1)) * (results.length + 1));
