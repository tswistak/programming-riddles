/**
 * @param {object} workshop - A representation of the workshop
 * @param {string|number|boolean} gift - The gift to find
 * @returns {number[]} The path to the gift
 */
function findGiftPath(workshop, gift) {
  const traverse = (obj, path) => {
    for (const [key, val] of Object.entries(obj)) {
      if (val === gift) {
        return [...path, key];
      }
      if (typeof val === "object") {
        const result = traverse(val, [...path, key]);
        if (result.length > 0) {
          return result;
        }
      }
    }
    return [];
  };
  return traverse(workshop, []);
}

const workshop = {
  storage: {
    shelf: {
      box1: "train",
      box2: "switch",
    },
    box: "car",
  },
  gift: "doll",
};

findGiftPath(workshop, "train");
// ➜ ['storage', 'shelf', 'box1']

findGiftPath(workshop, "switch");
// ➜ ['storage', 'shelf', 'box2']

findGiftPath(workshop, "car");
// ➜ ['storage', 'box']

findGiftPath(workshop, "doll");
// ➜ ['gift']

findGiftPath(workshop, "plane");
// ➜ []
