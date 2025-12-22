/**
 * @param {string[][]} maze
 * @returns {boolean}
 */
function canEscape(maze) {
  let start = [null, null];
  outer: for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze.length; j++) {
      const cell = maze[i][j];
      if (cell === "S") {
        start = [i, j];
        break outer;
      }
    }
  }
  const getNeighbors = (i, j) => {
    const neighbors = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ];
    return neighbors.filter((x) => {
      const cell = maze[x[0]]?.[x[1]];
      return cell === "." || cell === "E";
    });
  };

  const queue = [...getNeighbors(start[0], start[1])];
  const visited = new Set([JSON.stringify(start)]);
  while (queue.length) {
    const node = queue.pop();
    visited.add(JSON.stringify(node));
    const nodeValue = maze[node[0]][node[1]];
    if (nodeValue === "E") {
      return true;
    }
    const neighbors = getNeighbors(node[0], node[1]);
    queue.push(...neighbors.filter((x) => !visited.has(JSON.stringify(x))));
  }

  return false;
}

canEscape([
  ["S", ".", "#", "."],
  ["#", ".", "#", "."],
  [".", ".", ".", "."],
  ["#", "#", "#", "E"],
]);
// → true

canEscape([
  ["S", "#", "#"],
  [".", "#", "."],
  [".", "#", "E"],
]);
// → false

canEscape([["S", "E"]]);
// → true

canEscape([
  ["S", ".", ".", ".", "."],
  ["#", "#", "#", "#", "."],
  [".", ".", ".", ".", "."],
  [".", "#", "#", "#", "#"],
  [".", ".", ".", ".", "E"],
]);
// → true

canEscape([
  ["S", ".", "."],
  [".", ".", "."],
  ["#", "#", "#"],
  [".", ".", "E"],
]);
// → false
