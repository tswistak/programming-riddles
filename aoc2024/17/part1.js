const fs = require("fs");

const input = fs.readFileSync("./input", {
  encoding: "utf-8",
});

const [, aStr, bStr, cStr, program] = input.match(
  /Register A: (\d+)\nRegister B: (\d+)\nRegister C: (\d+)\n\nProgram: (.*)/,
);

let a = Number(aStr);
let b = Number(bStr);
let c = Number(cStr);
let pointer = 0;
const output = [];
const instructions = program.split(",").map(Number);

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
    a = Math.trunc(a / 2 ** combo(operand));
    movePtr();
  },
  1: (operand) => {
    b = b ^ operand;
    movePtr();
  },
  2: (operand) => {
    b = combo(operand) % 8;
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
    output.push(combo(operand) % 8);
    movePtr();
  },
  6: (operand) => {
    b = Math.trunc(a / 2 ** combo(operand));
    movePtr();
  },
  7: (operand) => {
    c = Math.trunc(a / 2 ** combo(operand));
    movePtr();
  },
};

while (pointer <= instructions.length - 1) {
  const opcode = instructions[pointer];
  const operand = instructions[pointer + 1];
  // console.log({ pointer, opcode, operand, a, b, c });
  operations[opcode](operand);
}

console.log(output.join(","));
