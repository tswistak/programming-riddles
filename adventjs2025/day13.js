/**
 * @param {string[]} factory - The factory layout
 * @returns {'completed'|'broken'|'loop'} Result of the gift journey
 */
function runFactory(factory) {
  const visited = new Set();
  let i = 0;
  let j = 0;
  while (true) {
    const key = `${i},${j}`;
    if (visited.has(key)) {
      return "loop";
    }
    const char = factory[i]?.[j];
    if (char == null) {
      return "broken";
    }
    if (char === ".") {
      return "completed";
    }
    if (char === ">") {
      j++;
    } else if (char === "<") {
      j--;
    } else if (char === "^") {
      i--;
    } else if (char === "v") {
      i++;
    }
    visited.add(key);
  }
}

runFactory([">>."]); // 'completed'

runFactory([">>>"]); // 'broken'

runFactory([">><"]); // 'loop'

runFactory([">>v", "..<"]); // 'completed'

runFactory([">>v", "<<<"]); // 'broken'

runFactory([">v.", "^.."]); // 'completed'

runFactory(["v.", "^."]); // 'loop'
