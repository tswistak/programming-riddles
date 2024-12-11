const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split(" ");

let result = [...input];

for (let i = 0; i < 25; i++) {
  const newResult = [];
  for (const stone of result) {
    if (stone === "0") {
      newResult.push("1");
    } else if (stone.length % 2 === 0) {
      const mid = stone.length / 2;
      const firstHalf = String(Number(stone.slice(0, mid)));
      const secondHalf = String(Number(stone.slice(mid)));
      newResult.push(firstHalf);
      newResult.push(secondHalf);
    } else {
      newResult.push(String(Number(stone) * 2024));
    }
  }
  result = newResult;
}
console.log(result.length);
