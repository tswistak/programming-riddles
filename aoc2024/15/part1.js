const fs = require("fs");

const input = fs
  .readFileSync("./input", {
    encoding: "utf-8",
  })
  .split("\n");

const map = [];
const instructions = [];
let robotPosition = [0, 0];
let isParsingInstructions = false;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  if (line.trim() === "") {
    isParsingInstructions = true;
    continue;
  }
  if (isParsingInstructions) {
    instructions.push(...line.split(""));
  } else {
    map.push(line.split(""));
    const robot = line.indexOf("@");
    if (robot !== -1) {
      robotPosition = [i, robot];
    }
  }
}

map[robotPosition[0]][robotPosition[1]] = ".";

const DIRECTIONS = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

for (const instruction of instructions) {
  const [x, y] = robotPosition;
  const [dx, dy] = DIRECTIONS[instruction];
  const [newX, newY] = [x + dx, y + dy];
  const current = map[newX][newY];
  if (current === "#") {
    continue;
  }
  if (current === ".") {
    robotPosition = [newX, newY];
    continue;
  }
  if (current === "O") {
    let [lastX, lastY] = [newX, newY];
    const boxes = [[lastX, lastY]];

    while (true) {
      const nextX = lastX + dx;
      const nextY = lastY + dy;
      const nextCell = map[nextX]?.[nextY];
      if (nextCell === "#" || nextCell == null) {
        break;
      }
      if (nextCell === ".") {
        for (let i = boxes.length - 1; i >= 0; i--) {
          const [boxX, boxY] = boxes[i];
          map[boxX + dx][boxY + dy] = "O";
          map[boxX][boxY] = ".";
        }
        map[robotPosition[0]][robotPosition[1]] = ".";
        robotPosition = [newX, newY];
        break;
      }
      if (nextCell === "O") {
        boxes.push([nextX, nextY]);
        lastX = nextX;
        lastY = nextY;
      } else {
        break;
      }
    }
  }
}

let result = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "O") {
      result += 100 * i + j;
    }
  }
}

console.log(result);
// map[robotPosition[0]][robotPosition[1]] = "@";
// for (let i = 0; i < map.length; i++) {
//   console.log(map[i].join(""));
// }
