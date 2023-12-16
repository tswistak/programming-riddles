function decode(message) {
  const toDecode = message.match(/\(([^()]*)\)/g);
  if (toDecode) {
    for (const match of toDecode) {
      const reversed = match.slice(1, -1).split("").reverse().join("");
      message = message.replace(match, reversed);
    }
    return decode(message);
  }
  return message;
}

// iterative version, no regex
function decode(message) {
  let stack = [];
  let currentString = "";

  for (const char of message) {
    if (char === "(") {
      stack.push(currentString);
      currentString = "";
    } else if (char === ")") {
      currentString = stack.pop() + currentString.split("").reverse().join("");
    } else {
      currentString += char;
    }
  }

  return currentString;
}

const a = decode("hola (odnum)");
console.log(a); // hola mundo

const b = decode("(olleh) (dlrow)!");
console.log(b); // hello world!

const c = decode("sa(u(cla)atn)s");
console.log(c); // santaclaus

// Step by step:
// 1. Reverse the nested -> sa(ualcatn)s
// 2. Reverse the remaining one -> santaclaus
