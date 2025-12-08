/** @param {number} height - Height of the tree
 *  @param {string} ornament - Character to use as ornament
 *  @param {number} frequency - How often ornaments appear
 *  @returns {string} The decorated tree
 */
function drawTree(height, ornament, frequency) {
  let drawn = 0;
  const tree = [];
  const initialEmpty = height - 1;
  for (let i = 0; i < height; i++) {
    const empty = initialEmpty - i;
    const chars = height * 2 - 1 - empty * 2;
    let line = " ".repeat(empty);
    for (let j = 0; j < chars; j++) {
      drawn++;
      if (drawn % frequency === 0) {
        line += ornament;
      } else {
        line += "*";
      }
    }
    tree.push(line);
  }
  tree.push(" ".repeat(initialEmpty) + "#");
  return tree.join("\n");
}

drawTree(5, "o", 2);
//     *
//    o*o
//   *o*o*
//  o*o*o*o
// *o*o*o*o*
//     #

drawTree(3, "@", 3);
//   *
//  *@*
// *@**@
//   #

drawTree(4, "+", 1);
//    +
//   +++
//  +++++
// +++++++
//    #
