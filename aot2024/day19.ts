type Parse = unknown;

import type { Expect, Equal } from "type-testing";

type t0_actual = Parse<`
let teddyBear = "standard_model";
`>;
type t0_expected = [
  {
    id: "teddyBear";
    type: "VariableDeclaration";
  },
];
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = Parse<`
buildToy(teddyBear);
`>;
type t1_expected = [
  {
    argument: "teddyBear";
    type: "CallExpression";
  },
];
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = Parse<`
let robotDog = "deluxe_model";
assembleToy(robotDog);
`>;
type t2_expected = [
  {
    id: "robotDog";
    type: "VariableDeclaration";
  },
  {
    argument: "robotDog";
    type: "CallExpression";
  },
];
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = Parse<`
  const giftBox = "premium_wrap";
    var ribbon123 = "silk";
  
  \t
  wrapGift(giftBox);
  \r\n
      addRibbon(ribbon123);
`>;
type t3_expected = [
  {
    id: "giftBox";
    type: "VariableDeclaration";
  },
  {
    id: "ribbon123";
    type: "VariableDeclaration";
  },
  {
    argument: "giftBox";
    type: "CallExpression";
  },
  {
    argument: "ribbon123";
    type: "CallExpression";
  },
];
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_input = "\n\t\r \t\r ";
type t4_actual = Parse<t4_input>;
type t4_expected = [];
type t4 = Expect<Equal<t4_actual, t4_expected>>;
