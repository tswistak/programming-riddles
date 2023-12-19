type Repeat<T, N extends number, R extends unknown[] = []> = R['length'] extends N ? R : Repeat<T, N, [T, ...R]>;
type MapToEmoji<I extends number> = I extends 0
  ? '🛹'
  : I extends 1
  ? '🚲'
  : I extends 2
  ? '🛴'
  : I extends 3
  ? '🏄'
  : never;
type NextIndex<I extends number> = [1, 2, 3, 0][I];
type RebuildMapped<T extends unknown[], Index extends number = 0> = T extends [infer F, ...infer R]
  ? F extends number
    ? [...Repeat<MapToEmoji<Index>, F>, ...RebuildMapped<R, NextIndex<Index>>]
    : never
  : [];
type Rebuild<T extends unknown[]> = RebuildMapped<T>;

import { Expect, Equal } from 'type-testing';

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected =  [
  '🛹', '🛹',
	'🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = [
	'🛹', '🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴',
	'🏄',
	'🛹', '🛹',
	'🚲',
	'🛴', '🛴'
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
	'🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;