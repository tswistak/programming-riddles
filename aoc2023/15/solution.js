const fs = require("fs");

function parseData(data) {
  return data.split(",");
}

function hash(str) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result = ((result + str.charCodeAt(i)) * 17) % 256;
  }
  return result;
}

function part1(data) {
  const strings = parseData(data);
  let sum = 0;
  for (const str of strings) {
    sum += hash(str);
  }
  return sum;
}

function part2(data) {
  const boxes = new Map([...Array(256).keys()].map((x) => [x, []]));
  const strings = parseData(data);
  for (const str of strings) {
    const label = str.match(/[a-z]+/)[0];
    const boxId = hash(label);
    const box = boxes.get(boxId);
    const operation = str.replace(label, "");
    if (operation[0] === "-") {
      boxes.set(
        boxId,
        box.filter((x) => x.label !== label),
      );
    } else if (operation[0] === "=") {
      const value = parseInt(operation.replace("=", ""));
      const lens = box.find((x) => x.label === label);
      if (lens) {
        lens.value = value;
      } else {
        box.push({ label, value });
      }
    }
  }
  let sum = 0;
  for (const [boxId, box] of boxes) {
    for (let i = 0; i < box.length; i++) {
      sum += (boxId + 1) * (i + 1) * box[i].value;
    }
  }
  return sum;
}

const testData = fs.readFileSync("./test.txt", { encoding: "utf-8" });
const realData = fs.readFileSync("./input.txt", { encoding: "utf-8" });

console.log(part1(testData));
console.log(part1(realData));
console.log(part2(testData));
console.log(part2(realData));
