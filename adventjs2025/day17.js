/**
 * @param {string[][]} board
 * @returns {boolean}
 */
function hasFourLights(board) {
  if (board.length < 4 && board[0].length < 4) {
    return false;
  }
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
  return false;
}

hasFourLights([
  [".", ".", ".", ".", "."],
  ["R", "R", "R", "R", "."],
  ["G", "G", ".", ".", "."],
]);
// true → there are 4 red lights horizontally

hasFourLights([
  [".", "G", ".", "."],
  [".", "G", ".", "."],
  [".", "G", ".", "."],
  [".", "G", ".", "."],
]);
// true → there are 4 green lights vertically

hasFourLights([
  ["R", "G", "R"],
  ["G", "R", "G"],
  ["G", "R", "G"],
]);
// false → there are no 4 lights of the same color in a row
