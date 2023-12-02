function findFirstRepeated(gifts) {
  const met = new Set();
  for (const gift of gifts) {
    if (met.has(gift)) {
      return gift;
    } else {
      met.add(gift);
    }
  }
  return -1;
}
