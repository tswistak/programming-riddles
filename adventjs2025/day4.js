/**
 * @param {string} code - The code to decipher
 * @returns {string} The deciphered PIN
 */
function decodeSantaPin(code) {
  const blocks = code.match(/\[(\d)?([+-<]*)\]/g);
  let result = "";
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const [_, digit, operations] = block.match(/\[(\d)?([+-<]*)\]/);
    if (operations === "<" && i > 0) {
      result += result[i - 1];
    } else if (digit) {
      let digitNum = Number(digit);
      for (const op of operations || "") {
        if (op === "+") {
          digitNum++;
        } else if (op === "-") {
          digitNum--;
        }
      }
      const finalValue = (digitNum + 10) % 10;
      result += String(finalValue);
    }
  }
  return result.length < 4 ? null : result;
}

decodeSantaPin("[1++][2-][3+][<]");
// "3144"

decodeSantaPin("[9+][0-][4][<]");
// "0944"

decodeSantaPin("[1+][2-]");
// null (only 2 digits)
