function decode(message) {
  // trial 1 - fails tests 07 and 08
  // const toDecode = message.match(/(\(\w*\))/g);
  // let result = message;
  // if (toDecode) {
  //   for (const match of toDecode) {
  //     result = result.replace(
  //       match,
  //       match.replace("(", "").replace(")", "").split("").reverse().join("")
  //     );
  //   }
  //   return decode(result);
  // }
  // return message;

  // trial 2
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
