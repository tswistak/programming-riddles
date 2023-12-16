function transformTree(tree) {
  function heapToTree(tree, pos) {
    let node = null;
    if (pos < tree.length && tree[pos] != null) {
      node = {
        value: tree[pos],
        left: heapToTree(tree, pos * 2 + 1),
        right: heapToTree(tree, pos * 2 + 2),
      };
    }
    return node;
  }
  const result = heapToTree(tree, 0);
  return result;
}

console.log(transformTree([3, 1, 0, 8, 12, null, 1]));

/*
For example, running your transformTree function with [3, 1, 0, 8, 12, null, 1] should return this:

{
  value: 3,
  left: {
    value: 1,
    left: {
      value: 8,
      left: null,
      right: null
    },
    right: {
      value: 12,
      left: null,
      right: null
    }
  },
  right: {
    value: 0,
    left: null,
    right: {
      value: 1,
      left: null,
      right: null
    }
  }
}
 */
