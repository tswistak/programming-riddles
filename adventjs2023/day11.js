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

// alternative, a bit faster
function getIndexsForPalindrome(word) {
  for (let i = 0; i < word.length / 2; i++) {
    if (word[i] !== word[word.length - 1 - i]) {
      for (let j = 0; j < word.length; j++) {
        for (let k = j + 1; k < word.length; k++) {
          if (word[j] !== word[k]) {
            let swapped =
              word.slice(0, j) +
              word[k] +
              word.slice(j + 1, k) +
              word[j] +
              word.slice(k + 1);
            let isPalindrome = true;
            for (let l = 0; l < swapped.length / 2; l++) {
              if (swapped[l] !== swapped[swapped.length - 1 - l]) {
                isPalindrome = false;
                break;
              }
            }
            if (isPalindrome) {
              return [j, k];
            }
          }
        }
      }
      return null;
    }
  }
  return [];
}

getIndexsForPalindrome("anna"); // []
getIndexsForPalindrome("abab"); // [0, 1]
getIndexsForPalindrome("abac"); // null
getIndexsForPalindrome("aaaaaaaa"); // []
getIndexsForPalindrome("aaababa"); // [1, 3]
getIndexsForPalindrome("caababa"); // null
