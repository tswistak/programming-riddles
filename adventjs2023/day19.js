function revealSabotage(store) {
  for (let i = 0; i < store.length; i++) {
    for (let j = 0; j < store[i].length; j++) {
      const char = store[i][j];
      if (char === "*") {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let m = j - 1; m <= j + 1; m++) {
            if (
              k >= 0 &&
              m >= 0 &&
              k < store.length &&
              m < store[k].length &&
              (k !== i || m !== j) &&
              store[k][m] !== "*"
            ) {
              store[k][m] = String((parseInt(store[k][m]) || 0) + 1);
            }
          }
        }
      }
    }
  }
  return store;
}

const store = [
  ["*", " ", " ", " "],
  [" ", " ", "*", " "],
  [" ", " ", " ", " "],
  ["*", " ", " ", " "],
];

console.log(revealSabotage(store));
/* Should display:
[
    ['*', '2', '1', '1'],
    ['1', '2', '*', '1'],
    ['1', '2', '1', '1'],
    ['*', '1', ' ', ' ']
]
*/
