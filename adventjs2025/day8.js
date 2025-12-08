/**
 * @param {string} toy - The toy to find the first unique one letter
 * @returns {string} The first unique letter in the toy
 */
function findUniqueToy(toy) {
  const repeatedIndexes = new Set();
  for (let i = 0; i < toy.length; i++) {
    if (repeatedIndexes.has(i)) continue;
    const char1 = toy[i].toLowerCase();
    let isRepeated = false;
    for (let j = i + 1; j < toy.length; j++) {
      if (repeatedIndexes.has(j)) continue;
      const char2 = toy[j].toLowerCase();
      if (char1 === char2) {
        isRepeated = true;
        repeatedIndexes.add(j);
        continue;
      }
    }
    if (!isRepeated) {
      return toy[i];
    }
  }
  return "";
}

findUniqueToy("Gift"); // 'G'
// ℹ️ The G is the first letter that is not repeated
// and we return it exactly as it appears

findUniqueToy("sS"); // ''
// ℹ️ The letters are repeated, since it doesn't distinguish uppercase

findUniqueToy("reindeeR"); // 'i'
// ℹ️ The r is repeated (even if it's uppercase)
// and the e as well, so the first one is 'i'

// More cases:
findUniqueToy("AaBbCc"); // ''
findUniqueToy("abcDEF"); // 'a'
findUniqueToy("aAaAaAF"); // 'F'
findUniqueToy("sTreSS"); // 'T'
findUniqueToy("z"); // 'z'
