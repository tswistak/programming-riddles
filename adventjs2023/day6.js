function maxDistance(movements) {
  // trial 1 - test 11 fails
  // let distance = 0;
  // for (let i = 0; i < movements.length; i++) {
  //   const move = movements[i];
  //   if (move === ">") {
  //     distance++;
  //   } else if (move === "<") {
  //     distance--;
  //   } else if (move === "*") {
  //     distance += distance >= 0 ? 1 : -1;
  //   }
  // }
  // return Math.abs(distance);

  // trial 2
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
