/**
 * @param {number} size - The size of the gift
 * @param {string} symbol - The symbol to draw
 * @returns {string} The gift drawn
 */
function drawGift(size, symbol) {
  if (size < 2) {
    return "";
  }
  const lines = [symbol.repeat(size)];
  for (let i = 1; i < size - 1; i++) {
    lines.push(symbol + " ".repeat(size - 2) + symbol);
  }
  lines.push(symbol.repeat(size));
  return lines.join("\n");
}

const g1 = drawGift(4, "*");
console.log(g1);
/*
 ****
 *  *
 *  *
 ****
 */

const g2 = drawGift(3, "#");
console.log(g2);
/*
###
# #
###
*/

const g3 = drawGift(2, "-");
console.log(g3);
/*
--
--
*/

const g4 = drawGift(1, "+");
console.log(g4);
// ""  poor intern…
