/**
 * @param {string[][]} board
 * @returns {boolean}
 */
function hasFourInARow(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j <= board[i].length - 4; j++) {
      const lights = board[i].slice(j, j + 4).join("");
      if (lights === "GGGG" || lights === "RRRR") {
        return true;
      }
    }
  }
  for (let i = 0; i <= board.length - 4; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const lights =
        board[i][j] + board[i + 1][j] + board[i + 2][j] + board[i + 3][j];
      if (lights === "GGGG" || lights === "RRRR") {
        return true;
      }
    }
  }
  for (let i = 0; i <= board.length - 4; i++) {
    for (let j = 0; j <= board[i].length - 4; j++) {
      const lights1 =
        board[i][j] +
        board[i + 1][j + 1] +
        board[i + 2][j + 2] +
        board[i + 3][j + 3];
      const lights2 =
        board[i + 3][j] +
        board[i + 2][j + 1] +
        board[i + 1][j + 2] +
        board[i][j + 3];
      if (
        lights1 === "GGGG" ||
        lights1 === "RRRR" ||
        lights2 === "GGGG" ||
        lights2 === "RRRR"
      ) {
        return true;
      }
    }
  }
  return false;
}

hasFourInARow([
  ["R", ".", ".", "."],
  [".", "R", ".", "."],
  [".", ".", "R", "."],
  [".", ".", ".", "R"],
]);
// true → there are 4 red lights in a ↘ diagonal

hasFourInARow([
  [".", ".", ".", "G"],
  [".", ".", "G", "."],
  [".", "G", ".", "."],
  ["G", ".", ".", "."],
]);
// true → there are 4 green lights in a ↙ diagonal

hasFourInARow([
  ["R", "R", "R", "R"],
  ["G", "G", ".", "."],
  [".", ".", ".", "."],
  [".", ".", ".", "."],
]);
// true → there are 4 red lights in a horizontal line

hasFourInARow([
  ["R", "G", "R"],
  ["G", "R", "G"],
  ["G", "R", "G"],
]);
// false → there are no 4 consecutive lights of the same color
