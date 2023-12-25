function travelDistance(map) {
  const parsedMap = map.split("\n");
  const rows = parsedMap.length;
  const cols = parsedMap[0].length;

  const getNeighbors = (node) => {
    const [i, j] = node;
    return [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ].filter(([x, y]) => x >= 0 && y >= 0 && x < rows && y < cols);
  };

  const bfs = (startNode, endNode) => {
    const visited = Array.from(Array(rows), () => new Array(cols).fill(false));
    const queue = [[...startNode, 0]];

    while (queue.length > 0) {
      const [x, y, dist] = queue.shift();
      if (x === endNode[0] && y === endNode[1]) {
        return dist;
      }

      if (!visited[x][y]) {
        visited[x][y] = true;
        for (const [nx, ny] of getNeighbors([x, y])) {
          if (!visited[nx][ny]) {
            queue.push([nx, ny, dist + 1]);
          }
        }
      }
    }
    return -1;
  };

  const positions = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const char = parsedMap[i][j];
      if (char !== ".") {
        const position = char === "S" ? "0" : char;
        positions[position] = [i, j];
      }
    }
  }

  let totalDistance = 0;
  for (let i = 1; i < positions.length; i++) {
    if (!positions[i]) break;
    const distance = bfs(positions[i - 1], positions[i]);
    if (distance === -1) return -1;
    totalDistance += distance;
  }

  return totalDistance;
}

const map = `.....1....
..S.......
..........
....3.....
......2...`;

const result = travelDistance(map);
console.log(result); // -> 12 km
/*
From S to kid 1: 4 moves
From kid 1 to 2: 5 moves
From kid 2 to 3: 3 moves
Total: 12 moves
*/

const result2 = travelDistance(`..S.1...`);
console.log(result2); // -> 2
