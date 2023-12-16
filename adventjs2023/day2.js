function manufacture(gifts, materials) {
  const availableLetters = new Set([...materials]);
  const result = [];
  for (const gift of gifts) {
    let invalid = false;
    for (const letter of gift) {
      if (!availableLetters.has(letter)) {
        invalid = true;
        break;
      }
    }
    if (!invalid) {
      result.push(gift);
    }
  }
  return result;
}

// alternative
function manufacture(gifts, materials) {
  const availableLetters = new Set(materials);
  return gifts.filter((gift) =>
    gift.split("").every((letter) => availableLetters.has(letter)),
  );
}

const gifts = ["tren", "oso", "pelota"];
const materials = "tronesa";

manufacture(gifts, materials); // ["tren", "oso"]

const gifts1 = ["juego", "puzzle"];
const materials1 = "jlepuz";

manufacture(gifts1, materials1); // ["puzzle"]

const gifts2 = ["libro", "ps5"];
const materials2 = "psli";

manufacture(gifts2, materials2); // []
