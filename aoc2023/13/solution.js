const fs = require("fs");

function parseData(data) {
  const images = [];
  let currentImage = [];
  for (let i = 0; i < data.length; i++) {
    const currLine = data[i].split("");
    if (currLine.length === 0 && currentImage.length > 0) {
      images.push(currentImage);
      currentImage = [];
    } else if (currLine.length > 0) {
      currentImage.push(currLine);
    }
  }
  if (currentImage.length > 0) {
    images.push(currentImage);
  }
  return images;
}

function rotate(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const rotatedMatrix = [];

  for (let col = 0; col < columns; col++) {
    const newRow = [];
    for (let row = rows - 1; row >= 0; row--) {
      newRow.push(matrix[row][col]);
    }
    rotatedMatrix.push(newRow);
  }

  return rotatedMatrix;
}

function getReflectionRows(img) {
  let reflectedI = null;
  let reflectedJ = null;
  // moving from top to match the bottom
  for (let i = 0, j = img.length - 1; i < img.length && i < j; i++) {
    const top = JSON.stringify(img[i]);
    const bottom = JSON.stringify(img[j]);
    if (top === bottom) {
      reflectedI = i + 1;
      reflectedJ = j + 1;
      j--;
    } else if (j !== img.length - 1) {
      i--;
      j++;
    }
  }
  // moving from bottom to match the top if didn't found
  if (
    (reflectedI == null && reflectedJ == null) ||
    (reflectedI != null && reflectedJ != null && reflectedI + 1 !== reflectedJ)
  ) {
    for (let i = 0, j = img.length - 1; j >= 0 && i < j; j--) {
      const top = JSON.stringify(img[i]);
      const bottom = JSON.stringify(img[j]);
      if (top === bottom) {
        reflectedI = i + 1;
        reflectedJ = j + 1;
        i++;
      } else if (i > 0) {
        i--;
        j++;
      }
    }
  }
  if (reflectedI == null && reflectedJ == null) {
    return null;
  }
  if (reflectedI + 1 !== reflectedJ) {
    return null;
  }
  return [reflectedI, reflectedJ];
}

function part1(data) {
  const images = parseData(data);
  let result = 0;
  for (const img of images) {
    const horizontal = getReflectionRows(img);
    const rotated = rotate(img);
    const vertical = getReflectionRows(rotated);
    if (horizontal) {
      result += horizontal[0] * 100;
    }
    if (vertical) {
      result += vertical[0];
    }
  }
  return result;
}

function part2(data) {
  //
}

const testData = fs
  .readFileSync("./test.txt", { encoding: "utf-8" })
  .split("\n");
const realData = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

console.log(part1(testData));
console.log(part1(realData)); // wrong result
console.log(part2(testData));
console.log(part2(realData));
