function maxGifts(houses) {
  let n = houses.length;
  if (n === 1) {
    return houses[0];
  }

  let dp = new Array(n);
  dp[0] = houses[0];
  dp[1] = Math.max(houses[0], houses[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], houses[i] + dp[i - 2]);
  }

  return dp[n - 1];
}

console.log(maxGifts([2, 4, 2])); // 4 (4)
console.log(maxGifts([5, 1, 1, 5])); // 10 (5 + 5)
console.log(maxGifts([4, 1, 1, 4, 2, 1])); // 9 (4 + 4 + 1)
console.log(maxGifts([1, 3, 1, 3, 100])); // 103 (3 + 100)
