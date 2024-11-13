const fs = require("fs");

const tracks = fs
  .readFileSync("./everybody_codes_e2024_q07_p2.txt", {
    encoding: "utf-8",
  })
  //   `A:+,-,=,=
  // B:+,=,-,+
  // C:=,-,+,+
  // D:=,=,=,+`
  .split("\n")
  .map((x) => {
    const [key, operations] = x.split(":");
    return {
      key,
      operations: operations.split(","),
      lastResult: 10,
      result: 0,
    };
  });
const route = [
  ..."-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=--".split(
    "",
  ),
  "-",
  "=",
  "+",
  "+",
  "=",
  "=",
  "-",
  ..."--==++++==+=+++-=+=-=+=-+-=+-=+-=+=-=+=--=+++=++=+++==++==--=+=++==+++-"
    .split("")
    .reverse(),
  "-",
  "=",
  "+",
  "=",
  "+",
  "=",
  "-",
  "S",
];
// const route = [
//   ..."+===".split(""),
//   "+",
//   ..."=+=-+".split("").reverse(),
//   "-",
//   "S",
// ];

for (const track of tracks) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < route.length; j++) {
      const currRoute = route[j];
      const currOp = track.operations[j % track.operations.length];
      if (
        ((currRoute === "S" || currRoute === "=") && currOp === "+") ||
        currRoute === "+"
      ) {
        track.lastResult = track.lastResult + 1;
      } else if (
        ((currRoute === "S" || currRoute === "=") && currOp === "-") ||
        currRoute === "-"
      ) {
        track.lastResult = track.lastResult - 1;
      }
      track.result = track.result + track.lastResult;
    }
  }
}

const result = tracks
  .sort((a, b) => b.result - a.result)
  .map((x) => x.key)
  .join("");

console.log(
  tracks
    .sort((a, b) => b.result - a.result)
    .map((x) => ({ key: x.key, result: x.result })),
);

// todo dlaczego błędna?
console.log(result);
