const fs = require("fs");

function reverse(str) {
  return str.split("").reverse().join("");
}

function matchText(text, toFind) {
  const result = [];
  let i = 0;
  while (i < text.length) {
    const index = text.indexOf(toFind, i);
    if (index === -1) {
      break;
    }
    result.push(index);
    i = index + 1;
  }
  return result;
}

function matchedLetters(str, toMatch) {
  const matches = str.split("").map(() => false);
  for (const word of toMatch) {
    if (word.length > str.length) {
      continue;
    }
    const indices = matchText(str, word);
    for (const index of indices) {
      for (let i = 0; i < word.length; i++) {
        matches[index + i] = true;
      }
    }
  }
  return matches.reduce((p, c) => p + (c ? 1 : 0), 0);
}

const [wordsLine, _, ...rest] = fs
  .readFileSync("./everybody_codes_e2024_q2_p2.txt", {
    encoding: "utf-8",
  })
  .split("\n");

const baseWords = wordsLine.replace("WORDS:", "").split(",");
const words = [...baseWords, ...baseWords.map((x) => reverse(x))];

const result = rest.reduce(
  (prev, curr) => prev + matchedLetters(curr, words),
  0,
);

console.log(result);
