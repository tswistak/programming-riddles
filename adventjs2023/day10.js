function createChristmasTree(ornaments, height) {
  let ornamentCounter = 0;
  let result = [];
  for (let i = 0; i < height; i++) {
    const leftPad = Math.max(height - 1 - i, 0);
    const internalResult = [" ".repeat(leftPad)];
    for (let j = 0; j <= i; j++) {
      if (j > 0) {
        internalResult.push(" ");
      }
      internalResult.push(ornaments[ornamentCounter % ornaments.length]);
      ornamentCounter++;
    }
    result.push(internalResult.join(""));
  }
  return result.join("\n") + `\n${" ".repeat(height - 1)}|\n`;
}

// alternative
function createChristmasTree(ornaments, height) {
  let ornamentCounter = 0;
  let result = [];
  for (let i = 0; i < height; i++) {
    let line = "";
    const leftPad = Math.max(height - 1 - i, 0);
    line += " ".repeat(leftPad);
    for (let j = 0; j <= i; j++) {
      line +=
        (j > 0 ? " " : "") + ornaments[ornamentCounter % ornaments.length];
      ornamentCounter++;
    }
    result.push(line);
  }
  result.push(`${" ".repeat(height - 1)}|`, "");
  return result.join("\n");
}

/*
Test: createChristmasTree("x", 3)

Expected:
"  x
 x x
x x x
  |
"

Actual:
"  x
 x x
x x x
  |
"

Test #03

Test: createChristmasTree("xo", 4)

Expected:
"   x
  o x
 o x o
x o x o
   |
"

Actual:
"   x
  o x
 o x o
x o x o
   |
"*/
