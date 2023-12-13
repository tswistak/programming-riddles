function maxDistance(movements) {
  let rightMoves = 0;
  let leftMoves = 0;
  let starMoves = 0;
  for (let i = 0; i < movements.length; i++) {
    const move = movements[i];
    if (move === ">") {
      rightMoves++;
    } else if (move === "<") {
      leftMoves++;
    } else if (move === "*") {
      starMoves++;
    }
  }
  return Math.abs(rightMoves - leftMoves) + starMoves;
}

const movements = ">>*<";
const result = maxDistance(movements);
console.log(result); // -> 2

const movements2 = "<<<>";
const result2 = maxDistance(movements2);
console.log(result2); // -> 2

const movements3 = ">***>";
const result3 = maxDistance(movements3);
console.log(result3); // -> 5
