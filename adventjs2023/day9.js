function adjustLights(lights) {
  const possible = ["🔴", "🟢"];
  let ver1Sum = 0;
  let ver2Sum = 0;
  for (let i = 0; i < lights.length; i++) {
    const ver1Char = possible[i % 2];
    const ver2Char = possible[(i + 1) % 2];
    const currentChar = lights[i];
    if (ver1Char !== currentChar) {
      ver1Sum++;
    }
    if (ver2Char !== currentChar) {
      ver2Sum++;
    }
  }
  return Math.min(ver1Sum, ver2Sum);
}

adjustLights(["🟢", "🔴", "🟢", "🟢", "🟢"]);
// -> 1 (you change the fourth light to 🔴)

adjustLights(["🔴", "🔴", "🟢", "🟢", "🔴"]);
// -> 2 (you change the second light to 🟢 and the third to 🔴)

adjustLights(["🟢", "🔴", "🟢", "🔴", "🟢"]);
// -> 0 (they are already alternating)

adjustLights(["🔴", "🔴", "🔴"]);
// -> 1 (you change the second light to 🟢)
