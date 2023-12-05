function cyberReindeer(road, time) {
  let roadArray = road.split("");
  let sledPosition = roadArray.indexOf("S");
  roadArray[sledPosition] = ".";
  let result = [road];
  let changedBarriers = false;
  for (let i = 0; i < time - 1; i++) {
    const barriersOpen = i >= 4;
    const nextPos = sledPosition + 1;
    const nextChar = roadArray[nextPos];
    if (nextChar === ".") {
      sledPosition = nextPos;
    } else if (nextChar === "|" || nextChar === "*") {
      if (barriersOpen) {
        if (!changedBarriers) {
          roadArray = roadArray.map((x) => (x === "|" ? "*" : x));
          changedBarriers = true;
        }
        sledPosition = nextPos;
      }
    }
    const newRoad = [...roadArray];
    newRoad[sledPosition] = "S";
    result.push(newRoad.join(""));
  }
  return result;
}
