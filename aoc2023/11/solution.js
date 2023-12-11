const { FibonacciHeap } = require("@tyriar/fibonacci-heap");
const fs = require("fs");

function parseData(data) {
  return data.map((x) => x.split(""));
}

function expand(map) {
  const rowsToExpand = [];
  const columnsToExpand = [];
  // rows
  for (let i = 0; i < map.length; i++) {
    let canExpand = true;
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "#") {
        canExpand = false;
        break;
      }
    }
    if (canExpand) {
      rowsToExpand.push(i);
    }
  }
  // columns
  for (let j = 0; j < map[0].length; j++) {
    let canExpand = true;
    for (let i = 0; i < map.length; i++) {
      if (map[i][j] === "#") {
        canExpand = false;
        break;
      }
    }
    if (canExpand) {
      columnsToExpand.push(j);
    }
  }
  // expanding columns
  for (let k = columnsToExpand.length - 1; k >= 0; k--) {
    for (let i = 0; i < map.length; i++) {
      map[i].splice(columnsToExpand[k], 0, "X");
    }
  }
  // expanding rows
  const emptyRow = "X".repeat(map[0].length).split("");
  for (let k = rowsToExpand.length - 1; k >= 0; k--) {
    map.splice(rowsToExpand[k], 0, [...emptyRow]);
  }
}

function getPositions(map) {
  let galaxyIndex = 1;
  const positions = new Map();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "#") {
        positions.set(galaxyIndex, [i, j]);
        galaxyIndex++;
      }
    }
  }
  return positions;
}

function manhattan(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function getNeighbors(map, i, j) {
  return [
    i > 0 && [i - 1, j],
    i < map.length - 1 && [i + 1, j],
    j > 0 && [i, j - 1],
    j < map[i].length - 1 && [i, j + 1],
  ].filter(Boolean);
}

function dijkstra(map, startI, startJ, hiWeight) {
  const distance = map.map((x) => x.map((_) => Number.POSITIVE_INFINITY));
  distance[startI][startJ] = 0;
  const queue = new FibonacciHeap();
  const queueNodes = map.map((x) => x.map((_) => null));
  for (let i = 0; i < queueNodes.length; i++) {
    for (let j = 0; j < queueNodes[i].length; j++) {
      queueNodes[i][j] = queue.insert(distance[i][j], [i, j]);
    }
  }
  while (!queue.isEmpty()) {
    const [i, j] = queue.extractMinimum().value;
    for (const [nI, nJ] of getNeighbors(map, i, j)) {
      const weight = map[nI][nJ] === "X" ? hiWeight - 1 : 1;
      const newDistance = distance[i][j] + weight;
      if (distance[nI][nJ] > newDistance) {
        distance[nI][nJ] = newDistance;
        queue.decreaseKey(queueNodes[nI][nJ], newDistance);
      }
    }
  }
  return {
    distance,
  };
}

function part1(data) {
  const map = parseData(data);
  expand(map);
  const positions = getPositions(map);
  const galaxies = [...positions.keys()];
  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const first = positions.get(galaxies[i]);
      const second = positions.get(galaxies[j]);
      const distance = manhattan(first[0], first[1], second[0], second[1]);
      sum += distance;
    }
  }
  return sum;
}

function part2(data, weight) {
  const map = parseData(data);
  expand(map);
  const positions = getPositions(map);
  const galaxies = [...positions.keys()];
  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    const [startI, startJ] = positions.get(galaxies[i]);
    const { distance } = dijkstra(map, startI, startJ, weight);
    for (let j = i + 1; j < galaxies.length; j++) {
      const [x, y] = positions.get(galaxies[j]);
      sum += distance[x][y];
    }
  }
  return sum;
}

const testData = fs
  .readFileSync("./test.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

console.log(part1(testData));
console.log(part1(realData));
console.log(part2(testData, 10));
console.log(part2(testData, 100));
console.log(part2(realData, 1_000_000));
