const fs = require("fs");

const notes = fs
  .readFileSync("./everybody_codes_e2024_q1_p2.txt", {
    encoding: "utf-8",
  })
  .match(/(..?)/g);

const potionMap = {
  A: 1,
  B: 2,
  C: 4,
  D: 6,
  x: -1,
};

const result = notes.reduce((prev, curr) => {
  const [e1, e2] = curr.split("");
  return prev + Math.max(0, potionMap[e1] + potionMap[e2]);
}, 0);

console.log(result);
