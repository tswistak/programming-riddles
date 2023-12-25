function getStaircasePaths(steps, maxJump) {
  if (steps === 0) return [[]];
  const paths = [];
  for (let jump = 1; jump <= maxJump && jump <= steps; jump++) {
    const subPaths = getStaircasePaths(steps - jump, maxJump);
    for (const path of subPaths) {
      paths.push([jump, ...path]);
    }
  }

  return paths;
}

getStaircasePaths(2, 1); // [[1, 1]]
getStaircasePaths(3, 3); // [[1, 1, 1], [1, 2], [2, 1], [3]]
getStaircasePaths(5, 1); // [[1, 1, 1, 1, 1]]
getStaircasePaths(5, 2);
/*
[
  [1, 1, 1, 1, 1],
  [1, 1, 1, 2],
  [1, 1, 2, 1],
  [1, 2, 1, 1],
  [1, 2, 2],
  [2, 1, 1, 1],
  [2, 1, 2],
  [2, 2, 1],
]
*/
