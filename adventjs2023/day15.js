function autonomousDrive(store, movements) {
  function replace(str, index, replacement) {
    return (
      str.substring(0, index) +
      replacement +
      str.substring(index + replacement.length)
    );
  }

  let robotI, robotJ;
  outer: for (let i = 0; i < store.length; i++) {
    for (let j = 0; j < store[i].length; j++) {
      if (store[i][j] === "!") {
        robotI = i;
        robotJ = j;
        break outer;
      }
    }
  }
  for (const move of movements) {
    let nextI, nextJ;
    switch (move) {
      case "R":
        nextI = robotI;
        nextJ = robotJ + 1;
        break;
      case "L":
        nextI = robotI;
        nextJ = robotJ - 1;
        break;
      case "U":
        nextI = robotI - 1;
        nextJ = robotJ;
        break;
      case "D":
        nextI = robotI + 1;
        nextJ = robotJ;
        break;
    }
    if (store[nextI] && store[nextI][nextJ] && store[nextI][nextJ] !== "*") {
      store[nextI] = replace(store[nextI], nextJ, "!");
      store[robotI] = replace(store[robotI], robotJ, ".");
      robotI = nextI;
      robotJ = nextJ;
    }
  }
  return store;
}

// alternative
function autonomousDrive(store, movements) {
  const replace = (str, index, replacement) =>
    str.substr(0, index) + replacement + str.substr(index + 1);
  let robotI, robotJ;
  store.some((row, i) => {
    robotJ = row.indexOf("!");
    if (robotJ !== -1) {
      robotI = i;
      return true;
    }
    return false;
  });
  const moves = { R: [0, 1], L: [0, -1], U: [-1, 0], D: [1, 0] };
  for (const move of movements) {
    const [di, dj] = moves[move];
    const nextI = robotI + di;
    const nextJ = robotJ + dj;
    if (
      nextI >= 0 &&
      nextI < store.length &&
      nextJ >= 0 &&
      nextJ < store[nextI].length &&
      store[nextI][nextJ] !== "*"
    ) {
      store[nextI] = replace(store[nextI], nextJ, "!");
      store[robotI] = replace(store[robotI], robotJ, ".");
      robotI = nextI;
      robotJ = nextJ;
    }
  }
  return store;
}

// alternative 2
function autonomousDrive(store, movements) {
  let robotI, robotJ;
  store.some((row, i) => {
    robotJ = row.indexOf("!");
    if (robotJ !== -1) {
      robotI = i;
      return true;
    }
    return false;
  });
  const moves = { R: [0, 1], L: [0, -1], U: [-1, 0], D: [1, 0] };
  for (const move of movements) {
    const [di, dj] = moves[move];
    const nextI = robotI + di;
    const nextJ = robotJ + dj;
    if (
      nextI >= 0 &&
      nextI < store.length &&
      nextJ >= 0 &&
      nextJ < store[nextI].length &&
      store[nextI][nextJ] !== "*"
    ) {
      store[nextI] =
        store[nextI].substring(0, nextJ) +
        "!" +
        store[nextI].substring(nextJ + 1);
      store[robotI] =
        store[robotI].substring(0, robotJ) +
        "." +
        store[robotI].substring(robotJ + 1);
      robotI = nextI;
      robotJ = nextJ;
    }
  }
  return store;
}

const store = ["..!....", "...*.*."];

const movements = ["R", "R", "D", "L"];
const result = autonomousDrive(store, movements);
console.log(result);
/*
[
  ".......",
  "...*!*."
]
*/

// The last movement is to the left, but it cannot move because there is an obstacle.
