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
