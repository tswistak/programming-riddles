/**
 * @param {{ hand: 'L' | 'R', color: string }[]} gloves
 * @returns {string[]} Colors of matched pairs
 */
function matchGloves(gloves) {
  const usedIndexes = new Set();
  const result = [];
  for (let i = 0; i < gloves.length - 1; i++) {
    if (usedIndexes.has(i)) {
      continue;
    }
    const { hand, color } = gloves[i];
    for (let j = i + 1; j < gloves.length; j++) {
      if (usedIndexes.has(j)) {
        continue;
      }
      const { hand: handR, color: colorR } = gloves[j];
      if (handR === hand) {
        continue;
      }
      if (colorR === color) {
        result.push(color);
        usedIndexes.add(j);
        break;
      }
    }
  }
  return result;
}

const gloves = [
  { hand: "L", color: "red" },
  { hand: "R", color: "red" },
  { hand: "R", color: "green" },
  { hand: "L", color: "blue" },
  { hand: "L", color: "green" },
];

matchGloves(gloves);
// ["red", "green"]

// const gloves2 = [
//   { hand: "L", color: "gold" },
//   { hand: "R", color: "gold" },
//   { hand: "L", color: "gold" },
//   { hand: "L", color: "gold" },
//   { hand: "R", color: "gold" },
// ];

// matchGloves(gloves2);
// // ["gold", "gold"]

// const gloves3 = [
//   { hand: "L", color: "red" },
//   { hand: "R", color: "green" },
//   { hand: "L", color: "blue" },
// ];

// matchGloves(gloves3);
// // []
