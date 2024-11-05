const fs = require("fs");

const notes = fs
  .readFileSync("./everybody_codes_e2024_q1_p3.txt", {
    encoding: "utf-8",
  })
  .match(/(...)/g);

const potionMap = {
  A: 0,
  B: 1,
  C: 3,
  D: 5,
  x: 0,
};

const result = notes.reduce((prev, curr) => {
  const [e1, e2, e3] = curr.split("");
  let result = prev + potionMap[e1] + potionMap[e2] + potionMap[e3];
  const xs = (e1 === "x" ? 1 : 0) + (e2 === "x" ? 1 : 0) + (e3 === "x" ? 1 : 0);
  if (xs === 0) {
    result += 6;
  } else if (xs === 1) {
    result += 2;
  }
  return result;
}, 0);

console.log(result);
