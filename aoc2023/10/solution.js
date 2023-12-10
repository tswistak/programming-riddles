const { FibonacciHeap } = require("@tyriar/fibonacci-heap");
const fs = require("fs");

function parseData(data) {
  return data.map((x) => x.split(""));
}

const topAllowed = "|F7";
const bottomAllowed = "|LJ";
const leftAllowed = "-LF";
const rightAllowed = "-J7";

function replaceS(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "S") {
        const top = i > 0 ? topAllowed.includes(grid[i - 1][j]) : false;
        const bottom =
          i < grid.length - 1 ? bottomAllowed.includes(grid[i + 1][j]) : false;
        const left = j > 0 ? leftAllowed.includes(grid[i][j - 1]) : false;
        const right =
          j < grid[i].length - 1
            ? rightAllowed.includes(grid[i][j + 1])
            : false;
        let toReplace = ".";
        if (top && bottom) toReplace = "|";
        if (left && right) toReplace = "-";
        if (top && right) toReplace = "L";
        if (top && left) toReplace = "J";
        if (bottom && left) toReplace = "7";
        if (bottom && right) toReplace = "F";
        grid[i][j] = toReplace;
        return { startI: i, startJ: j };
      }
    }
  }
  return { startX: NaN, startY: NaN };
}

function part1(data) {
  function getNeighbors(grid, i, j) {
    const element = grid[i][j];
    const top = i > 0 && [i - 1, j];
    const bottom = i < grid.length - 1 && [i + 1, j];
    const left = j > 0 && [i, j - 1];
    const right = j < grid[i].length - 1 && [i, j + 1];
    switch (element) {
      case "|":
        return [top, bottom].filter(Boolean);
      case "-":
        return [left, right].filter(Boolean);
      case "L":
        return [top, right].filter(Boolean);
      case "J":
        return [top, left].filter(Boolean);
      case "7":
        return [bottom, left].filter(Boolean);
      case "F":
        return [bottom, right].filter(Boolean);
    }
    return [];
  }

  function dijkstra(grid, startI, startJ) {
    const previous = grid.map((x) => x.map((_) => null));
    const distance = grid.map((x) => x.map((_) => Number.POSITIVE_INFINITY));
    distance[startI][startJ] = 0;
    const queue = new FibonacciHeap();
    const queueNodes = grid.map((x) => x.map((_) => null));
    for (let i = 0; i < queueNodes.length; i++) {
      for (let j = 0; j < queueNodes[i].length; j++) {
        queueNodes[i][j] = queue.insert(distance[i][j], [i, j]);
      }
    }
    while (!queue.isEmpty()) {
      const [i, j] = queue.extractMinimum().value;
      for (const [nI, nJ] of getNeighbors(grid, i, j)) {
        const newDistance = distance[i][j] + 1;
        if (distance[nI][nJ] > newDistance) {
          distance[nI][nJ] = newDistance;
          previous[nI][nJ] = [i, j];
          queue.decreaseKey(queueNodes[nI][nJ], newDistance);
        }
      }
    }
    return {
      distance,
      previous,
    };
  }

  const grid = parseData(data);
  const { startI, startJ } = replaceS(grid);
  const { distance } = dijkstra(grid, startI, startJ);
  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < distance.length; i++) {
    for (let j = 0; j < distance[i].length; j++) {
      const value = distance[i][j];
      if (value && value !== Number.POSITIVE_INFINITY) {
        max = Math.max(value, max);
      }
    }
  }
  return max;
}

function part2(data) {
  function isEmpty(grid, i, j) {
    const curr = grid[i][j];
    if (curr === ".") {
      return true;
    }
    if (curr === "|") {
      if (i === 0 || i === grid.length - 1) {
        return true;
      }
      if (
        !topAllowed.includes(grid[i - 1][j]) ||
        !bottomAllowed.includes(grid[i + 1][j])
      ) {
        return true;
      }
    }
    if (curr === "-") {
      if (j === 0 || j === grid[i].length - 1) {
        return true;
      }
      if (
        !leftAllowed.includes(grid[i][j - 1]) ||
        !rightAllowed.includes(grid[i][j + 1])
      ) {
        return true;
      }
    }
    if (curr === "L") {
      if (i === 0 || j === grid[i].length - 1) {
        return true;
      }
      if (
        !topAllowed.includes(grid[i - 1][j]) ||
        !rightAllowed.includes(grid[i][j + 1])
      ) {
        return true;
      }
    }
    if (curr === "J") {
      if (i === 0 || j === 0) {
        return true;
      }
      if (
        !topAllowed.includes(grid[i - 1][j]) ||
        !leftAllowed.includes(grid[i][j - 1])
      ) {
        return true;
      }
    }
    if (curr === "7") {
      if (i === grid.length - 1 || j === 0) {
        return true;
      }
      if (
        !bottomAllowed.includes(grid[i + 1][j]) ||
        !leftAllowed.includes(grid[i][j - 1])
      ) {
        return true;
      }
    }
    if (curr === "F") {
      if (i === grid.length - 1 || j === grid[i].length - 1) {
        return true;
      }
      if (
        !bottomAllowed.includes(grid[i + 1][j]) ||
        !rightAllowed.includes(grid[i][j + 1])
      ) {
        return true;
      }
    }
    return false;
  }

  function floodFill(grid, i, j) {
    let filled = 0;
    let isOutside = false;

    function squeezeHorizontal(i, j, right) {
      let newJ = j;
      while (newJ >= 0 && newJ < grid[i].length) {
        const el = grid[i][newJ];
        if (el === "-") {
          newJ += right ? 1 : -1;
        } else {
          if (el === "F" && i < grid.length - 1 && grid[i + 1][newJ] === "L") {
            return false;
          }
          if (el === "L" && i > 0 && grid[i - 1][newJ] === "F") {
            return false;
          }
          if (isEmpty(grid, i, newJ)) {
            return [i, newJ];
          } else {
            newJ += right ? 1 : -1;
          }
        }
      }
      return false;
    }

    function squeezeVertical(i, j, bottom) {
      let newI = i;
      while (newI >= 0 && newI < grid.length) {
        const el = grid[newI][j];
        if (el === "|") {
          newI += bottom ? 1 : -1;
        } else {
          if (
            el === "L" &&
            j < grid[newI].length - 1 &&
            grid[newI][j + 1] === "J"
          ) {
            return false;
          }
          if (el === "J" && j > 0 && grid[newI][j - 1] === "L") {
            return false;
          }
          if (isEmpty(grid, newI, j)) {
            return [newI, j];
          } else {
            newI += bottom ? 1 : -1;
          }
        }
      }
      return false;
    }

    function fill(i, j, direction) {
      if (i < 0 || i >= grid.length) {
        return;
      }
      const curr = grid[i][j];
      if (!curr || curr === "x") {
        return;
      }
      if (isEmpty(grid, i, j)) {
        grid[i][j] = "x";
        filled++;
        if (
          i === 0 ||
          i === grid.length - 1 ||
          j === 0 ||
          j === grid[i].length - 1
        ) {
          isOutside = true;
        }
        fill(i - 1, j, "top");
        fill(i, j - 1, "left");
        fill(i, j + 1, "right");
        fill(i + 1, j, "bottom");
      } else {
        let nextPos = null;
        if (direction === "top" && curr !== "-") {
          nextPos = squeezeVertical(i, j, false);
        } else if (direction === "bottom" && curr !== "-") {
          nextPos = squeezeVertical(i, j, true);
        } else if (direction === "left" && curr !== "|") {
          nextPos = squeezeHorizontal(i, j, false);
        } else if (direction === "right" && curr !== "|") {
          nextPos = squeezeHorizontal(i, j, true);
        }
        if (nextPos) {
          fill(nextPos[0], nextPos[1]);
        }
      }
    }

    fill(i, j);
    return { filled, isOutside };
  }

  const grid = parseData(data);
  replaceS(grid);
  let result = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (isEmpty(grid, i, j)) {
        const { filled, isOutside } = floodFill(grid, i, j);
        // console.log(i, j);
        // console.log(grid.map((x) => x.join("")).join("\n"));
        // console.log(filled, isOutside);
        if (!isOutside) {
          result += filled;
        }
      }
    }
  }
  return result;
}

const testData = fs
  .readFileSync("./test.txt", { encoding: "utf-8" })
  .split("\n");
const test2Data = fs
  .readFileSync("./test2.txt", { encoding: "utf-8" })
  .split("\n");
const test21Data = fs
  .readFileSync("./test2_1.txt", { encoding: "utf-8" })
  .split("\n");
const test22Data = fs
  .readFileSync("./test2_2.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

console.log(part1(testData));
console.log(part1(realData));
console.log(part2(test2Data)); // 10
console.log(part2(test21Data)); // 4
console.log(part2(test22Data)); // 1 - too low (8)
console.log(part2(realData)); // 727 - too high
