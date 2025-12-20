/**
 * @param {string[][]} warehouse
 * @param {number[]} drops
 * @returns {string[][]}
 */
function clearGifts(warehouse, drops) {
  const cleanupLastRow = () => {
    const index = warehouse.length - 1;
    if (warehouse[index].every((x) => x === "#")) {
      const newRow = warehouse[index].map(() => ".");
      warehouse.pop();
      warehouse.unshift(newRow);
    }
  };

  for (const drop of drops) {
    for (let i = 0; i < warehouse.length; i++) {
      const current = warehouse[i][drop];
      const next = warehouse[i + 1]?.[drop];
      if (current === "#") {
        break;
      }
      if (next === "#" || next == null) {
        warehouse[i][drop] = "#";
        break;
      }
    }
    cleanupLastRow();
  }
  cleanupLastRow();
  return warehouse;
}

clearGifts(
  [
    [".", ".", "."],
    [".", ".", "."],
    ["#", ".", "#"],
  ],
  [1],
);
/*
1. The gift falls in column 1
2. Row 2 becomes [# # #].
3. Row 2 is complete, the robot clears it.
6. A new empty row is added at position 0.

Result:
[
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.']
]
*/

clearGifts(
  [
    [".", ".", "#"],
    ["#", ".", "#"],
    ["#", ".", "#"],
  ],
  [0, 1, 2],
);

/*
1. The gift falls in column 0
2. The gift falls in column 1
3. Row 2 becomes [# # #]
4. Row 2 is complete, the robot clears it

For now it looks like this:
[
  ['.', '.', '.']
  ['#', '.', '#'],
  ['#', '.', '#'],
]

5. The gift falls in column 2

Result:
[
  ['.', '.', '#'],
  ['#', '.', '#'],
  ['#', '.', '#']
]
*/
