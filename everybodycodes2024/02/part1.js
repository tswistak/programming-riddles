const fs = require("fs");

const [wordsLine, _, inscription] = fs
  .readFileSync("./everybody_codes_e2024_q2_p1.txt", {
    encoding: "utf-8",
  })
  .split("\n");

const words = wordsLine.replace("WORDS:", "").split(",");
const inscriptionSplit = inscription.split(" ");

const result = inscriptionSplit.reduce(
  (prev, curr) =>
    prev + words.reduce((pr, cu) => pr + (curr.includes(cu) ? 1 : 0), 0),
  0,
);

console.log(result);
