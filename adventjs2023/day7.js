function drawGift(size, symbol) {
  if (size === 1) {
    return "#\n";
  }
  let gift = " ".repeat(size - 1) + "#".repeat(size) + "\n";
  for (let i = 0; i < size - 2; i++) {
    const indent = " ".repeat(size - 2 - i);
    const topSymbols = symbol.repeat(size - 2);
    const sideSymbols = symbol.repeat(i);
    gift += indent + "#" + topSymbols + "#" + sideSymbols + "#\n";
  }
  gift += "#".repeat(size) + symbol.repeat(size - 2) + "#\n";
  for (let i = size - 3; i >= 0; i--) {
    const frontSymbols = symbol.repeat(size - 2);
    const sideSymbols = symbol.repeat(i);
    gift += "#" + frontSymbols + "#" + sideSymbols + "#\n";
  }
  gift += "#".repeat(size) + "\n";
  return gift;
}

// alternative, no concats
function drawGift(size, symbol) {
  if (size === 1) {
    return "#\n";
  }
  let gift = " ".repeat(size - 1) + "#".repeat(size) + "\n";
  for (let i = 0; i < size - 2; i++) {
    const indent = " ".repeat(size - 2 - i);
    const topSymbols = symbol.repeat(size - 2);
    const sideSymbols = symbol.repeat(i);
    gift = `${gift}${indent}#${topSymbols}#${sideSymbols}#\n`;
  }
  gift = `${gift}${"#".repeat(size)}${symbol.repeat(size - 2)}#\n`;
  for (let i = size - 3; i >= 0; i--) {
    const frontSymbols = symbol.repeat(size - 2);
    const sideSymbols = symbol.repeat(i);
    gift = `${gift}#${frontSymbols}#${sideSymbols}#\n`;
  }
  gift = `${gift}${"#".repeat(size)}\n`;
  return gift;
}

drawGift(4, "+");

/*
   ####
  #++##
 #++#+#
####++#
#++#+#
#++##
####
*/

drawGift(5, "*");
/*
    #####
   #***##
  #***#*#
 #***#**#
#####***#
#***#**#
#***#*#
#***##
#####
*/

drawGift(1, "^");
/*
#
*/
