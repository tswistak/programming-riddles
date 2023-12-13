function findNaughtyStep(original, modified) {
  let shorter = original.length < modified.length ? original : modified;
  let longer = original.length < modified.length ? modified : original;
  for (let i = 0; i < shorter.length; i++) {
    if (shorter[i] !== longer[i]) {
      return longer[i];
    }
  }
  return longer.length > shorter.length ? longer[longer.length - 1] : "";
}

const original = "abcd";
const modified = "abcde";
findNaughtyStep(original, modified); // 'e'

const original1 = "stepfor";
const modified1 = "stepor";
findNaughtyStep(original1, modified1); // 'f'

const original2 = "abcde";
const modified2 = "abcde";
findNaughtyStep(original2, modified2); // ''
