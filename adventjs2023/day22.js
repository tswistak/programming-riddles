function compile(code) {
  let counter = 0;
  let returnPoint = null;
  let inIgnoredBlock = false;
  for (let i = 0; i < code.length; i++) {
    const current = code[i];
    if (inIgnoredBlock && current !== "?") continue;
    switch (current) {
      case "+":
        counter++;
        break;
      case "*":
        counter *= 2;
        break;
      case "-":
        counter--;
        break;
      case "%":
        returnPoint = i;
        break;
      case "<":
        if (returnPoint != null) {
          i = returnPoint;
          returnPoint = null;
        }
        break;
      case "¿":
        inIgnoredBlock = counter <= 0;
        break;
      case "?":
        inIgnoredBlock = false;
        break;
    }
  }
  return counter;
}

compile("++*-"); // 3
// (1 + 1) * 2 - 1 = 3

compile("++%++<"); // 6
// 1 + 1 + 1 + 1 + 1 + 1 = 6

compile("++<--"); // 0
// 1 + 1 - 1 - 1 = 0

compile("++¿+?"); // 3
// 1 + 1 + 1 = 3

compile("--¿+++?"); // -2
// - 1 - 1 = -2
