const fs = require("fs");

function parseCard(card) {
  const [match, id] = card.match(/Card\s*(\d+):/);
  const [winning, numbers] = card
    .replace(match, "")
    .trim()
    .split("|")
    .map((x) =>
      x
        .trim()
        .split(/\s+/)
        .map((y) => parseInt(y))
    );
  return {
    gameId: parseInt(id),
    winning,
    numbers,
  };
}

function part1(data) {
  let result = 0;
  for (const rawCard of data) {
    const { winning, numbers } = parseCard(rawCard);
    const winningSet = new Set(winning);
    let matches = 0;
    for (const number of numbers) {
      if (winningSet.has(number)) {
        matches++;
      }
    }
    if (matches > 0) {
      result += 2 ** (matches - 1);
    }
  }
  return result;
}

function part2(data) {
  const cards = data.map(parseCard);
  const copies = new Map(cards.map((x) => [x.gameId, 1]));
  for (const { gameId, winning, numbers } of cards) {
    const winningSet = new Set(winning);
    let matches = 0;
    for (const number of numbers) {
      if (winningSet.has(number)) {
        matches++;
      }
    }
    const currentCopies = copies.get(gameId);
    for (let i = 1; i <= matches; i++) {
      copies.set(gameId + i, copies.get(gameId + i) + currentCopies);
    }
  }
  let result = 0;
  for (const copiesNum of copies.values()) {
    result += copiesNum;
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
