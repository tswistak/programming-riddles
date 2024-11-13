const fs = require("fs");

const tracks = fs
  .readFileSync("./everybody_codes_e2024_q07_p1.txt", {
    encoding: "utf-8",
  })
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

for (const track of tracks) {
  for (const op of track.operations) {
    if (op === "+") {
      track.lastResult = track.lastResult + 1;
    } else if (op === "-") {
      track.lastResult = track.lastResult - 1;
    }
    track.result = track.result + track.lastResult;
  }
}

const result = tracks
  .sort((a, b) => b.result - a.result)
  .map((x) => x.key)
  .join("");

console.log(result);
