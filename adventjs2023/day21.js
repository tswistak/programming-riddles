function findBalancedSegment(message) {
  let longest = [];
  for (let i = 0; i < message.length - 1; i++) {
    for (let j = message.length; j > i; j--) {
      let zeroLength = 0;
      let oneLength = 0;
      for (let k = i; k < j; k++) {
        if (message[k] === 0) {
          zeroLength++;
        } else if (message[k] === 1) {
          oneLength++;
        }
      }
      if (zeroLength === oneLength) {
        if (longest.length === 0 || longest[1] - longest[0] < j - i - 1)
          longest = [i, j - 1];
      }
    }
  }
  return longest;
}

findBalancedSegment([1, 1, 0, 1, 1, 0, 1, 1]);
//                         |________|
// position of segment:    [2, 5]
// longest balanced
// of 0s and 1s

findBalancedSegment([1, 1, 0]);
//                      |__|
//                     [1, 2]

findBalancedSegment([1, 1, 1]);
// no balanced segments: []
