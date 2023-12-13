function organizeGifts(gifts) {
  const splitGifts = gifts.match(/(\d*\w)/g);
  const result = [];
  for (const gift of splitGifts) {
    const [_, countStr, symbol] = gift.match(/(\d*)(\w)/);
    const count = parseInt(countStr);
    const pallets = Math.trunc(count / 50);
    result.push(`[${symbol}]`.repeat(pallets));
    const giftsAfterPallets = count % 50;
    const boxes = Math.trunc(giftsAfterPallets / 10);
    result.push(`{${symbol}}`.repeat(boxes));
    const giftsAfterBoxes = giftsAfterPallets % 10;
    if (giftsAfterBoxes) {
      result.push(`(${symbol.repeat(giftsAfterBoxes)})`);
    }
  }
  return result.join("");
}

const result1 = organizeGifts("76a11b");
console.log(result1);
// `[a]{a}{a}(aaaaaa){b}(b)`

/* Explanation:

  76a: 76 gifts type 'a' would be packed in 7 boxes and 6 gifts would be left, resulting in 1 pallet [a] (for the first 5 boxes), 2 loose boxes {a}{a} and a bag with 6 gifts (aaaaaa)

  11b: 11 gifts type 'b' would be packed in 1 box and 1 gift would be left, resulting in 1 loose box {b} and a bag with 1 gift (b)
*/
