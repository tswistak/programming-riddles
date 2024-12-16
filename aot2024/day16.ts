declare function DynamicParamsCurrying<F extends (...args: any[]) => any>(
  fn: F
): Curry<F>;

type Curry<F extends (...args: any[]) => any> =
  <T extends any[]>(
    ...args: T
  ) => T extends []
    ? Curry<F>
    : F extends (...args: [...T, ...infer R]) => infer Return
    ? R extends []
      ? Return
      : Curry<(...args: R) => Return>
    : never;

const originalCurry = (
  ingredient1: number,
  ingredient2: string,
  ingredient3: boolean,
  ingredient4: Date,
) => true;

const spikedCurry = DynamicParamsCurrying(originalCurry);

// Direct call
const t0 = spikedCurry(0, "Ziltoid", true, new Date());

// Partially applied
const t1 = spikedCurry(1)("The", false, new Date());

// Another partial
const t2 = spikedCurry(0, "Omniscient", true)(new Date());

// You can keep callin' until the cows come home: it'll wait for the last argument
const t3 = spikedCurry()()()()(0, "Captain", true)()()()(new Date());

// currying is ok
const t4 = spikedCurry(0, "Spectacular", true);

// @ts-expect-error arguments provided in the wrong order
const e0 = spikedCurry("Nebulo9", 0, true)(new Date());
