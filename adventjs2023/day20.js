function distributeGifts(weights) {
  const result = [];
  for (let i = 0; i < weights.length; i++) {
    const newArr = [];
    result.push(newArr);
    for (let j = 0; j < weights[i].length; j++) {
      const toAvg = [
        weights[i - 1]?.[j],
        weights[i + 1]?.[j],
        weights[i][j - 1],
        weights[i][j + 1],
        weights[i][j],
      ].filter((x) => x != null);
      newArr.push(Math.round(toAvg.reduce((a, b) => a + b, 0) / toAvg.length));
    }
  }
  return result;
}

const input = [
  [4, 5, 1],
  [6, null, 3],
  [8, null, 4],
];

distributeGifts(input);

// Step by step result of the first few calculations:

// At position [0][0] we have the value 4
// Its neighbors are the values 5 and 6
// (4 + 5 + 6) / 3 = 5

// At position [0][1] we have the value 5
// Its neighbors are the values 4 and 1
// (5 + 4 + 1) / 3 = 3.33
// Math.round(3.33) = 3

// At position [0][2] we have the value 1
// Its neighbors are the values 5 and 3
// (1 + 5 + 3) / 3 = 3

// At position [1][0] we have the value 6
// Its neighbors are the values 4, 8
// (6 + 4 + 8 ) / 3 = 6

// At position [1][1] we have the value null
// Its neighbors are the values 5, 6 and 3
// (5 + 6 + 3) / 3 = 4.66
// Math.round(4.66) = 5
// ... and so on with the rest of the positions
// [
//   [(4 + 5 + 6) / 3, (5 + 4 + 1) / 3, (1 + 5 + 3) / 3],
//   [(6 + 4 + 8) / 3, (5 + 6 + 3) / 3, (3 + 1 + 4) / 3],
//   [(8 + 6) / 2, (8 + 4) / 2, (4 + 3) / 2]
// ]

// Final result after rounding with Math.round()
// [
//   [5, 3, 3],
//   [6, 5, 3],
//   [7, 6, 4]
// ]
