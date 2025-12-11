/**
 * @param {string} s - The string to check
 * @returns {number} The maximum depth of the magic
 */
function maxDepth(s) {
  const bracketStarts = [];
  let currDepth = 0;
  let maxDepth = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === "[") {
      bracketStarts.push(i);
      currDepth++;
    } else if (char === "]") {
      const poppedIndex = bracketStarts.pop();
      currDepth--;
      if (poppedIndex == null) {
        return -1;
      }
    }
    if (currDepth > maxDepth) {
      maxDepth = currDepth;
    }
  }
  return bracketStarts.length > 0 ? -1 : maxDepth;
}

maxDepth("[]"); // -> 1
maxDepth("[[]]"); // -> 2
maxDepth("[][]"); // -> 1
maxDepth("[[][]]"); // -> 2
maxDepth("[[[]]]"); // -> 3
maxDepth("[][[]][]"); // -> 2

maxDepth("]["); // -> -1 (closes before opening)
maxDepth("[[["); // -> -1 (missing closing brackets)
maxDepth("[]]]"); // -> -1 (extra closing brackets)
maxDepth("[][]["); // -> -1 (one remains unclosed)
