/**
 * @param {string} elf1 - The moves of the first elf
 * @param {string} elf2 - The moves of the second elf
 * @return {number} - The result of the battle
 */
function elfBattle(elf1, elf2) {
  const length = Math.max(elf1.length, elf2.length);
  let hp1 = 3;
  let hp2 = 3;
  for (let i = 0; i < length; i++) {
    const e1 = elf1[i];
    const e2 = elf2[i];
    if (e1 === "F") {
      hp2 -= 2;
    }
    if (e2 === "F") {
      hp1 -= 2;
    }
    if (e1 === "A" && e2 !== "B") {
      hp2 -= 1;
    }
    if (e2 === "A" && e1 !== "B") {
      hp1 -= 1;
    }
    if (hp1 <= 0 && hp2 > 0) {
      return 2;
    }
    if (hp2 <= 0 && hp1 > 0) {
      return 1;
    }
    if (hp1 <= 0 && hp2 <= 0) {
      return 0;
    }
  }
  if (hp1 < hp2) {
    return 2;
  }
  if (hp2 < hp1) {
    return 1;
  }
  return 0;
}

elfBattle("A", "B");
// Round 1: A vs B -> Elf 2 blocks
// Result: Elf 1 = 3 HP
//         Elf 2 = 3 HP
// → 0

elfBattle("F", "B");
// Round 1: F vs B -> Elf 2 takes 2 damage (F cannot be blocked)
// Result: Elf 1 = 3 HP
//         Elf 2 = 1 HP
// → 1

elfBattle("AAB", "BBA");
// R1: A vs B → Elf 2 blocks
// R2: A vs B → Elf 2 blocks
// R3: B vs A → Elf 1 blocks
// Result: Elf 1 = 3, Elf 2 = 3
// → 0

elfBattle("AFA", "BBA");
// R1: A vs B → Elf 2 blocks
// R2: F vs B → Elf 2 takes 2 damage (F cannot be blocked)
// R3: A vs A → both -1
// Result: Elf 1 = 2, Elf 2 = 0
// → 1

elfBattle("AFAB", "BBAF");
// R1: A vs B → Elf 2 blocks
// R2: F vs B → Elf 2 takes 2 damage (F cannot be blocked)
// R3: A vs A → both -1 → Elf 2 reaches 0 Battle ends!
// R4: is not played, since Elf 2 has no health left
// → 1

elfBattle("AA", "FF");
// R1: A vs F → Elf 1 -2, Elf 2 -1
// R2: A vs F → Elf 1 -2, Elf 2 -1 → Elf 1 reaches -1
// → 2
