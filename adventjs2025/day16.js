/**
 * @param {number[]} gifts - The gifts to pack
 * @param {number} maxWeight - The maximum weight of the sleigh
 * @returns {number | null} The number of sleighs needed
 * Return null if no sleigh can carry all the gifts
 */
function packGifts(gifts, maxWeight) {
  let sleighs = 0;
  let currentSleigh = maxWeight;
  for (const gift of gifts) {
    if (gift > maxWeight) {
      return null;
    }
    const newWeight = currentSleigh + gift;
    if (newWeight > maxWeight) {
      sleighs++;
      currentSleigh = gift;
    } else {
      currentSleigh = newWeight;
    }
  }
  return sleighs;
}

packGifts([2, 3, 4, 1], 5);
// 2 sleighs
// Sleigh 1: 2 + 3 = 5
// Sleigh 2: 4 + 1 = 5

packGifts([3, 3, 2, 1], 3);
// 3 sleighs
// Sleigh 1: 3
// Sleigh 2: 3
// Sleigh 3: 2 + 1 = 3

packGifts([1, 1, 1, 1], 2);
// 2 sleighs
// Sleigh 1: 1 + 1 = 2
// Sleigh 2: 1 + 1 = 2

packGifts([5, 6, 1], 5);
// null
// There is a gift weighing 6 that doesn’t fit

packGifts([], 10);
// 0 sleighs
// There are no gifts to deliver
