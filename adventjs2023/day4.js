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

const a = decode("hola (odnum)");
console.log(a); // hola mundo

const b = decode("(olleh) (dlrow)!");
console.log(b); // hello world!

const c = decode("sa(u(cla)atn)s");
console.log(c); // santaclaus

// Step by step:
// 1. Reverse the nested -> sa(ualcatn)s
// 2. Reverse the remaining one -> santaclaus
