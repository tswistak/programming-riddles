function manufacture(gifts, materials) {
  const availableLetters = new Set([...materials]);
  const result = [];
  for (const gift of gifts) {
    let invalid = false;
    for (const letter of gift) {
      if (!availableLetters.has(letter)) {
        invalid = true;
        break;
      }
    }
    if (!invalid) {
      result.push(gift);
    }
  }
  return result;
}
