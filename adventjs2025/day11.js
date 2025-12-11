/**
 * @param {string[]} warehouse - The warehouse layout
 * @returns {number} The count of unwatched gifts
 */
function findUnsafeGifts(warehouse) {
  let unwatched = 0;
  for (let i = 0; i < warehouse.length; i++) {
    const row = warehouse[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === "*") {
        const neighbors = [
          i > 0 ? warehouse[i - 1][j] : null,
          i < warehouse.length - 1 ? warehouse[i + 1][j] : null,
          j > 0 ? warehouse[i][j - 1] : null,
          j < row.length - 1 ? warehouse[i][j + 1] : null,
        ];
        if (neighbors.every((x) => x !== "#")) {
          unwatched++;
        }
      }
    }
  }
  return unwatched;
}
