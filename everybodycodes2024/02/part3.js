const fs = require("fs");

function reverse(str) {
  return str.split("").reverse().join("");
}

function matchText(text, toFind) {
  for (let i = 0; i < text.length; i++) {
    const indices = [];
    let match = true;
    for (let j = 0; j < toFind.length; j++) {
      const textIndex = (i + j) % text.length;
      if (text[textIndex] !== toFind[j]) {
        match = false;
        break;
      }
      indices.push(textIndex);
    }
    if (match) {
      return indices;
    }
  }
  return [];
}

function matchedLetters(str, toMatch, visitedSet, usedWords) {
  for (const word of toMatch) {
    if (word.length > str.line.length || usedWords.has(word)) {
      continue;
    }
    let indices = matchText(str.line, word);
    if (indices.length !== 0) {
      usedWords.add(word);
      usedWords.add(reverse(word));
    }
    for (const index of indices) {
      if ("row" in str) {
        visitedSet.add(`${str.row},${index}`);
      } else if ("col" in str) {
        visitedSet.add(`${index},${str.col}`);
      }
    }
  }
}

function transpose(strings) {
  const length = strings[0].length;
  const result = Array.from({ length }, () => "");
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < strings.length; j++) {
      result[i] += strings[j][i];
    }
  }
  return result;
}

// zły wynik
const [wordsLine, _, ...rest] = fs
  .readFileSync("./everybody_codes_e2024_q2_p3.txt", {
    encoding: "utf-8",
  })
  .split("\n");

// const [wordsLine, _, ...rest] = `WORDS:THE,OWE,MES,ROD,RODEO

// HELWORLT
// ENIGWDXL
// TRODEOAL`.split("\n");

const baseWords = wordsLine.replace("WORDS:", "").split(",");
const words = new Set([...baseWords, ...baseWords.map((x) => reverse(x))]);
const toCheck = [
  ...rest.map((x, i) => ({ line: x, row: i })),
  ...transpose(rest).map((x, i) => ({ line: x, col: i })),
];
const visited = new Set();
const usedWords = new Set();
toCheck.forEach((x) => matchedLetters(x, words, visited, usedWords));

const result = visited.size;

console.log(result);
