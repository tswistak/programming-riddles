const fs = require("fs");

const notes = fs
  .readFileSync("./everybody_codes_e2024_q1_p1.txt", {
    encoding: "utf-8",
  })
  .split("");

const potionMap = {
  A: 0,
  B: 1,
  C: 3,
};

const result = notes.reduce((prev, curr) => prev + (potionMap[curr] || 0), 0);

console.log(result);
