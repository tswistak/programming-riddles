type Letters = {
    A: [
      '█▀█ ',
      '█▀█ ',
      '▀ ▀ ',
    ],
    B: [
      '█▀▄ ',
      '█▀▄ ',
      '▀▀  '
    ],
    C: [
      '█▀▀ ',
      '█ ░░',
      '▀▀▀ '
    ],
    E: [
      '█▀▀ ',
      '█▀▀ ',
      '▀▀▀ '
    ],
    H: [
      '█ █ ',
      '█▀█ ',
      '▀ ▀ '
    ],
    I: [
      '█ ',
      '█ ',
      '▀ '
    ],
    M: [
      '█▄░▄█ ',
      '█ ▀ █ ',
      '▀ ░░▀ '
    ],
    N: [
      '█▄░█ ',
      '█ ▀█ ',
      '▀ ░▀ '
    ],
    P: [
      '█▀█ ',
      '█▀▀ ',
      '▀ ░░'
    ],
    R: [
      '█▀█ ',
      '██▀ ',
      '▀ ▀ '
    ],
    S: [
      '█▀▀ ',
      '▀▀█ ',
      '▀▀▀ '
    ],
    T: [
      '▀█▀ ',
      '░█ ░',
      '░▀ ░'
    ],
    Y: [
      '█ █ ',
      '▀█▀ ',
      '░▀ ░'
    ],
    W: [
      '█ ░░█ ',
      '█▄▀▄█ ',
      '▀ ░ ▀ '
    ],
    ' ': [
      '░',
      '░',
      '░'
    ],
    ':': [
      '#',
      '░',
      '#'
    ],
    '*': [
      '░',
      '#',
      '░'
    ],
};

type AddLetter<T extends string, T1 extends string = "", T2 extends string = "", T3 extends string = "", TResult extends string[] = []> = 
    T extends `${infer TFirst}${infer TRest}` 
    ? TFirst extends '\n' 
        ? AddLetter<TRest, '', '', '', [...TResult, T1, T2, T3]> 
        : TFirst extends keyof Letters 
            ? AddLetter<TRest, `${T1}${Letters[TFirst][0]}`, `${T2}${Letters[TFirst][1]}`, `${T3}${Letters[TFirst][2]}`, TResult>
            : never
    : [...TResult, T1, T2, T3]

type ToAsciiArt<T extends string> = AddLetter<Uppercase<T>>

import { Equal, Expect } from "type-testing";

type test_0_actual = ToAsciiArt<"   * : * Merry * : *   \n  Christmas  ">;
//   ^?
type test_0_expected = [
  "░░░░░#░░░█▄░▄█ █▀▀ █▀█ █▀█ █ █ ░░░#░░░░░",
  "░░░#░░░#░█ ▀ █ █▀▀ ██▀ ██▀ ▀█▀ ░#░░░#░░░",
  "░░░░░#░░░▀ ░░▀ ▀▀▀ ▀ ▀ ▀ ▀ ░▀ ░░░░#░░░░░",
  "░░█▀▀ █ █ █▀█ █ █▀▀ ▀█▀ █▄░▄█ █▀█ █▀▀ ░░",
  "░░█ ░░█▀█ ██▀ █ ▀▀█ ░█ ░█ ▀ █ █▀█ ▀▀█ ░░",
  "░░▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀▀▀ ░▀ ░▀ ░░▀ ▀ ▀ ▀▀▀ ░░",
];
type test_0 = Expect<Equal<test_0_actual, test_0_expected>>;

type test_1_actual = ToAsciiArt<"  Happy new  \n  * : * : * Year * : * : *  ">;
//   ^?
type test_1_expected = [
        "░░█ █ █▀█ █▀█ █▀█ █ █ ░█▄░█ █▀▀ █ ░░█ ░░",
        "░░█▀█ █▀█ █▀▀ █▀▀ ▀█▀ ░█ ▀█ █▀▀ █▄▀▄█ ░░",
        "░░▀ ▀ ▀ ▀ ▀ ░░▀ ░░░▀ ░░▀ ░▀ ▀▀▀ ▀ ░ ▀ ░░",
        "░░░░#░░░#░░░█ █ █▀▀ █▀█ █▀█ ░░░#░░░#░░░░",
        "░░#░░░#░░░#░▀█▀ █▀▀ █▀█ ██▀ ░#░░░#░░░#░░",
        "░░░░#░░░#░░░░▀ ░▀▀▀ ▀ ▀ ▀ ▀ ░░░#░░░#░░░░",
];
type test_1 = Expect<Equal<test_1_actual, test_1_expected>>;

type test_2_actual = ToAsciiArt<"  * : * : * : * : * : * \n  Trash  \n  * : * : * : * : * : * ">;
//   ^?
type test_2_expected = [
  "░░░░#░░░#░░░#░░░#░░░#░░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░░░#░░░#░░░#░░░#░░░#░░░",
  "░░▀█▀ █▀█ █▀█ █▀▀ █ █ ░░",
  "░░░█ ░██▀ █▀█ ▀▀█ █▀█ ░░",
  "░░░▀ ░▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀ ░░",
  "░░░░#░░░#░░░#░░░#░░░#░░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░░░#░░░#░░░#░░░#░░░#░░░",
];
type test_2 = Expect<Equal<test_2_actual, test_2_expected>>;

type test_3_actual = ToAsciiArt<"  : * : * : * : * : * : * : \n  Ecyrbe  \n  : * : * : * : * : * : * : ">;
//   ^?
type test_3_expected = [
  "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░░░#░░░#░░░#░░░#░░░#░░░#░░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░█▀▀ █▀▀ █ █ █▀█ █▀▄ █▀▀ ░░",
  "░░█▀▀ █ ░░▀█▀ ██▀ █▀▄ █▀▀ ░░",
  "░░▀▀▀ ▀▀▀ ░▀ ░▀ ▀ ▀▀  ▀▀▀ ░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
  "░░░░#░░░#░░░#░░░#░░░#░░░#░░░",
  "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
];
type test_3 = Expect<Equal<test_3_actual, test_3_expected>>;