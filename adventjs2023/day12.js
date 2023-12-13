function checkIsValidCopy(original, copy) {
  // check for nonletter degradation
  const re = /[^\w#\+:\.]/g;
  let match;
  const indexToOmit = new Set();
  while ((match = re.exec(original)) != null) {
    indexToOmit.add(match.index);
    if (copy[match.index] !== original[match.index]) {
      return false;
    }
  }
  // check each letter
  for (let i = 0; i < original.length; i++) {
    if (indexToOmit.has(i)) {
      continue;
    }
    const origChar = original[i];
    const copyChar = copy[i];
    if (!`${origChar}${origChar.toLowerCase()}#+:. `.includes(copyChar)) {
      return false;
    }
  }
  return true;
}

checkIsValidCopy("Santa Claus is coming", "sa#ta Cl#us i+ comin#"); // true
checkIsValidCopy("s#nta Cla#s is coming", "p#nt: cla#s #s c+min#"); // false (due to the initial p)
checkIsValidCopy("Santa Claus", "s#+:. c:. s"); // true
checkIsValidCopy("Santa Claus", "s#+:.#c:. s"); // false (there is a # where it shouldn't be)
