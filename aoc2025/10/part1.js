const fs = require("fs");

const input = fs
  // .readFileSync("input", "utf-8")
  .readFileSync("sample", "utf-8")
  .trim()
  .split("\n");

const machines = input.map((line) => {
  const parts = line.split(" ");
  const lights = parts[0]
    .replace("[", "")
    .replace("]", "")
    .split("")
    .map((x) => (x === "#" ? 1 : 0));
  const requirements = parts[parts.length - 1]
    .replace("{", "")
    .replace("}", "")
    .split(",")
    .map(Number);
  const buttons = parts
    .slice(1, parts.length - 1)
    .map((s) => s.replace("(", "").replace(")", "").split(",").map(Number));
  return { lights, buttons, requirements };
});

// todo
