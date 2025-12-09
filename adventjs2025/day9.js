/**
 * @param {string} board - Represent the board situation
 * @param {string} moves - Movement direction
 * @returns {'fail' | 'crash' | 'success'}
 */
function moveReno(board, moves) {
  let [startX, startY] = [0, 0];
  const boardArr = board
    .trim()
    .split("\n")
    .map((x) => x.split(""));
  console.log({ boardArr });
  outer: for (let i = 0; i < boardArr.length; i++) {
    for (let j = 0; j < boardArr[i].length; j++) {
      if (boardArr[i][j] === "@") {
        startY = i;
        startX = j;
        break outer;
      }
    }
  }
  let [i, j] = [startY, startX];
  for (const move of moves) {
    switch (move) {
      case "L":
        j--;
        break;
      case "R":
        j++;
        break;
      case "U":
        i--;
        break;
      case "D":
        i++;
        break;
    }
    if (i >= boardArr.length || i < 0 || j >= boardArr[0].length || j < 0) {
      return "crash";
    }
    const char = boardArr[i][j];
    switch (char) {
      case "*":
        return "success";
      case "#":
        return "crash";
    }
  }
  return "fail";
}

const board = `
.....
.*#.*
.@...
.....
`;

moveReno(board, "D");
// ➞ 'fail' -> it moves but doesn’t pick anything up

moveReno(board, "U");
// ➞ 'success' -> it picks something up (*) just above

moveReno(board, "RU");
// ➞ 'crash' -> it crashes into an obstacle (#)

moveReno(board, "RRRUU");
// ➞ 'success' -> it picks something up (*)

moveReno(board, "DD");
// ➞ 'crash' -> it crashes into the bottom of the board

moveReno(board, "UUU");
// ➞ 'success' -> it picks something up from the floor (*) and then crashes at the top

moveReno(board, "RR");
// ➞ 'fail' -> it moves but doesn’t pick anything up
