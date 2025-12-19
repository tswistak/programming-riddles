const fs = require("fs");

const input = fs
  .readFileSync("input", "utf-8")
  // .readFileSync("sample2", "utf-8")
  .trim()
  .split("\n");

const neighborList = new Map();

for (const line of input) {
  const [name, neighbors] = line.split(": ");
  neighborList.set(name, neighbors.split(" "));
}

const paths = new Set();

function dfs(node, visited, path) {
  path.push(node);
  if (visited.has(node)) {
    return;
  }
  const setPath = new Set(path);
  const neighbors = neighborList.get(node) || [];
  for (const neighbor of neighbors) {
    if (neighbor === "out") {
      if (setPath.has("dac") && setPath.has("fft")) {
        path.push("out");
        paths.add(path.join(","));
      }
    } else {
      const newVisited = new Set(visited);
      newVisited.add(node);
      dfs(neighbor, newVisited, [...path]);
    }
  }
}

dfs("svr", new Set(), []);

console.log(paths.size);

// todo optimize
