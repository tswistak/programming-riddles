const fs = require("fs");

const input = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const [, , bStr, cStr, program] = input.match(
  /Register A: (\d+)\nRegister B: (\d+)\nRegister C: (\d+)\n\nProgram: (.*)/,
);

const instructions = program.split(",").map(Number);

let i = 371788590n;
outer: while (true) {
  console.log(i);
  i++;
  let a = i;
  let b = BigInt(bStr);
  let c = BigInt(cStr);
  let pointer = 0;
  const output = [];

  function movePtr() {
    pointer += 2;
  }

  function combo(operand) {
    if (operand <= 3) {
      return operand;
    }
    if (operand === 4) {
      return a;
    }
    if (operand === 5) {
      return b;
    }
    if (operand === 6) {
      return c;
    }
    if (operand === 7) {
      throw new Error("Invalid operand");
    }
  }

  const operations = {
    0: (operand) => {
      a = a / 2n ** BigInt(combo(operand));
      movePtr();
    },
    1: (operand) => {
      b = b ^ BigInt(operand);
      movePtr();
    },
    2: (operand) => {
      b = BigInt(combo(operand)) % 8n;
      movePtr();
    },
    3: (operand) => {
      if (a !== 0) {
        pointer = operand;
      } else {
        movePtr();
      }
    },
    4: () => {
      b = b ^ c;
      movePtr();
    },
    5: (operand) => {
      output.push(Number(BigInt(combo(operand) % 8n)));
      movePtr();
    },
    6: (operand) => {
      b = a / 2n ** BigInt(combo(operand));
      movePtr();
    },
    7: (operand) => {
      c = a / 2n ** BigInt(combo(operand));
      movePtr();
    },
  };

  while (pointer <= instructions.length - 1) {
    const opcode = instructions[pointer];
    const operand = instructions[pointer + 1];
    operations[opcode](operand);
    const lastOutput = output.length - 1;
    if (lastOutput >= 1 && output[lastOutput] !== instructions[lastOutput]) {
      continue outer;
    }
  }

  if (
    output.length === instructions.length &&
    output.join(",").localeCompare(instructions.join(",")) === 0
  ) {
    console.log("Result:", i);
    break;
  }
}
