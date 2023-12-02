const fs = require("fs");

function part1(data) {
  let result = 0;
  for (const line of data) {
    const numbers = line.match(/\d/g);
    result += parseInt(numbers[0] + numbers.at(-1));
  }
  return result;
}

function part2(data) {
  const replaceMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  let result = 0;
  for (const line of data) {
    let fixedLine = "";
    let tmp = "";
    for (const char of line) {
      if (/\d/.test(char)) {
        fixedLine += tmp + char;
        tmp = "";
      } else {
        tmp += char;
        if (tmp.length > 2) {
          for (const [num, value] of Object.entries(replaceMap)) {
            if (tmp.includes(num)) {
              const replaced = tmp.replace(num, value);
              fixedLine += replaced;
              tmp = tmp.at(-1); // last letter can be shared
              break;
            }
          }
        }
      }
    }
    fixedLine += tmp;
    const numbers = fixedLine.match(/\d/g);
    result += parseInt(numbers[0] + numbers.at(-1));
  }
  return result;
}

const testData = fs
  .readFileSync("./test.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");
const test2Data = fs
  .readFileSync("./test2.txt", { encoding: "utf-8" })
  .split("\n");

console.log(part1(testData));
console.log(part1(realData));
console.log(part2(test2Data));
console.log(part2(realData));
