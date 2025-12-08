const fs = require("fs");

const input = fs
  // .readFileSync("input", "utf-8")
  .readFileSync("sample", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number));

const boxes = [...input.map((x) => [x])];

while (true) {
  const singleBox = boxes.find((b) => b.length === 1);
  if (!singleBox) break;
  const [x, y, z] = singleBox[0];
  let closestBox = null;
  let closestBoxDistance = Infinity;
  for (const box of boxes) {
    if (box === singleBox) continue;
    let closestBoxInGroup = null;
    let closestBoxInGroupDistance = Infinity;
    for (const circuit in box) {
      const [x2, y2, z2] = box[circuit];
      const distance = Math.abs(x - x2) + Math.abs(y - y2) + Math.abs(z - z2);
      if (distance < closestBoxInGroupDistance) {
        closestBoxInGroupDistance = distance;
        closestBoxInGroup = box[circuit];
      }
    }
    if (closestBoxInGroupDistance < closestBoxDistance) {
      closestBoxDistance = closestBoxInGroupDistance;
      closestBox = box;
    }
  }
  if (closestBox) {
    closestBox.push(singleBox[0]);
    boxes.splice(boxes.indexOf(singleBox), 1);
  }
}

const lengths = boxes.map((b) => BigInt(b.length));
const result = lengths.reduce((acc, curr) => acc * curr, 1n);

console.log({ lengths, result });
