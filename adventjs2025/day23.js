/**
 * @param {string[][]} map - The town map.
 * @returns {number} - Minimum steps to deliver all gifts.
 */
function minStepsToDeliver(map) {
  let start = [null, null];
  let presents = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cell = map[i][j];
      if (cell === "S") {
        start = [i, j];
      }
      if (cell === "G") {
        presents++;
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
      const cell = map[x[0]]?.[x[1]];
      return cell === "." || cell === "G";
    });
  };
  const queue = [{ pos: start, depth: 0 }];
  const visited = new Set();
  let gifted = 0;
  let sum = 0;
  while (queue.length && gifted < presents) {
    const { pos, depth } = queue.shift();
    visited.add(JSON.stringify(pos));
    const nodeValue = map[pos[0]][pos[1]];
    if (nodeValue === "G") {
      gifted++;
      sum += depth;
    }
    for (const neighborPos of getNeighbors(pos[0], pos[1])) {
      if (visited.has(JSON.stringify(neighborPos))) {
        continue;
      }
      queue.push({ pos: neighborPos, depth: depth + 1 });
    }
  }
  return gifted < presents ? -1 : sum;
}

minStepsToDeliver([
  ["S", ".", "G"],
  [".", "#", "."],
  ["G", ".", "."],
]);
// Result: 4

/* 
Explanation:
- Minimum distance from S (0,0) to G (0,2): 2 steps
- Minimum distance from S (0,0) to G (2,0): 2 steps
- Total: 2 + 2 = 4
*/

minStepsToDeliver([
  ["S", "#", "G"],
  ["#", "#", "."],
  ["G", ".", "."],
]);
// Result: -1
// (The house at (0,2) is unreachable due to obstacles)

minStepsToDeliver([["S", "G"]]);
// Result: 1
