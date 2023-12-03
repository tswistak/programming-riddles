function findNaughtyStep(original, modified) {
  // trial 1 - test 06 fails
  // const origLetters = [...original];
  // const modLetters = [...modified];
  // const diff = origLetters.filter(x => !modLetters.includes(x))
  //               .concat(modLetters.filter(x => !origLetters.includes(x)));
  // return diff.length ? diff[0] : '';

  // trial 2 - test 04 fails
  // if (original.length === modified.length) {
  //   return '';
  // }
  // for (let i = 0; i < Math.min(original.length, modified.length); i++) {
  //   if (original[i] !== modified[i]) {
  //     return modified[i];
  //   }
  // }
  // return modified[modified.length - 1];

  // trial 3
  let shorter = original.length < modified.length ? original : modified;
  let longer = original.length < modified.length ? modified : original;
  for (let i = 0; i < shorter.length; i++) {
    if (shorter[i] !== longer[i]) {
      return longer[i];
    }
  }
  return longer.length > shorter.length ? longer[longer.length - 1] : "";
}
