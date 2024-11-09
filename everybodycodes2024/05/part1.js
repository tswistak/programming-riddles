const fs = require("fs");

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

const clappers = transpose(
  fs
    .readFileSync("./everybody_codes_e2024_q5_p1.txt", {
      encoding: "utf-8",
    })
    .split("\n")
    .map((x) => x.split(" ").map((y) => parseInt(y))),
);

const results = [];

for (let i = 0; i < 10; i++) {
  const currentCol = i % clappers.length;
  const currentClapper = clappers[currentCol].shift();
  let targetCol = (i + 1) % clappers.length;
  let direction = 1;
  let targetRow = -1;
  for (let j = 0; j < currentClapper; j++) {
    targetRow += direction;
    if (targetRow === clappers[targetCol].length || targetRow < 0) {
      direction = direction * -1;
      targetCol = (targetCol + 1) % clappers.length;
      if (targetRow < 0) {
        targetRow++;
      }
    }
  }
  clappers[targetCol].splice(targetRow, 0, currentClapper);
  results.push(transpose(clappers)[0].join(""));
}

console.log(results);
