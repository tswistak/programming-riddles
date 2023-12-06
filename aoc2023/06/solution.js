const fs = require("fs");

const parseData = (data) => {
  const times = data[0].match(/\d+/g).map((x) => parseInt(x));
  const distances = data[1].match(/\d+/g).map((x) => parseInt(x));

  return {
    times,
    distances,
  };
};

function part1(data) {
  const { times, distances } = parseData(data);
  let result = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const toBeat = distances[i];
    let possibilities = 0;
    for (let t = 1; t < time; t++) {
      const remaining = time - t;
      const distance = remaining * t;
      if (distance > toBeat) {
        possibilities++;
      }
    }
    result *= possibilities;
  }
  return result;
}

function part2(data) {
  const { times, distances } = parseData(data);
  const time = parseInt(times.map((x) => "" + x).join(""));
  const toBeat = parseInt(distances.map((x) => "" + x).join(""));
  let result = 0;
  for (let t = 1; t < time; t++) {
    const remaining = time - t;
    const distance = remaining * t;
    if (distance > toBeat) {
      result++;
    }
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
