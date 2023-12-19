const fs = require("fs");

function parseData(data) {
  const workflows = new Map();
  const parts = [];
  let isParsingParts = false;
  for (const line of data) {
    if (!line) {
      isParsingParts = true;
    } else if (isParsingParts) {
      const [, x, m, a, s] = line
        .match(/x=(\d+),m=(\d+),a=(\d+),s=(\d+)/)
        .map((x) => parseInt(x));
      parts.push({ x, m, a, s });
    } else {
      const [, name, rulesStr] = line.match(/(\w+){(.+)}/);
      const unparsedRules = rulesStr.split(",");
      const rules = [];
      for (const rule of unparsedRules) {
        if (rule.indexOf(":") < 0) {
          rules.push({ action: rule });
        } else {
          const [condition, action] = rule.split(":");
          rules.push({ condition, action });
        }
      }
      workflows.set(name, rules);
    }
  }
  return {
    workflows,
    parts,
  };
}

function checkCondition(condStr, part) {
  const operator = condStr.indexOf("<") !== -1 ? "<" : ">";
  const [prop, value] = condStr.split(operator);
  if (operator === "<") {
    return part[prop] < parseInt(value);
  } else {
    return part[prop] > parseInt(value);
  }
}

function part1(data) {
  const { parts, workflows } = parseData(data);
  let sum = 0;
  for (const part of parts) {
    let nextAction = "in";
    while (nextAction !== "R" && nextAction !== "A") {
      const rules = workflows.get(nextAction);
      for (const { condition, action } of rules) {
        if (!condition) {
          nextAction = action;
        } else {
          const result = checkCondition(condition, part);
          if (result) {
            nextAction = action;
            break;
          }
        }
      }
    }
    if (nextAction === "A") {
      sum += part.x + part.m + part.a + part.s;
    }
  }
  return sum;
}

function part2(data) {
  //
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
