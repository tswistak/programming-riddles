function getIndexsForPalindrome(word) {
  function isPalindrome(str) {
    for (let i = 0; i < str.length / 2; i++) {
      if (str[i] !== str[str.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  if (isPalindrome(word)) {
    return [];
  }

  for (let i = 0; i < word.length; i++) {
    for (let j = i + 1; j < word.length; j++) {
      let chars = word.split("");
      [chars[i], chars[j]] = [chars[j], chars[i]];
      let swappedString = chars.join("");

      if (isPalindrome(swappedString)) {
        return [i, j];
      }
    }
  }

  return null;
}

getIndexsForPalindrome("anna"); // []
getIndexsForPalindrome("abab"); // [0, 1]
getIndexsForPalindrome("abac"); // null
getIndexsForPalindrome("aaaaaaaa"); // []
getIndexsForPalindrome("aaababa"); // [1, 3]
getIndexsForPalindrome("caababa"); // null
