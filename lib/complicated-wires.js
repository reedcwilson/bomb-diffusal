'use strict';

let instructions = {
  "c": "Cut the wire",
  "d": "Do not cut the wire",
  "s": "Cut the wire if the last digit of the serial number is even",
  "p": "Cut the wire if the bomb has a parallel port",
  "b": "Cut the wire if the bomb has two or more batteries",
};

// solutions: led, colors, star (e.g. 1r0 = has led, color is red and no star)

let solutions = {
  "0w0"  : "c",
  "0w1"  : "c",
  "1w0"  : "d",
  "1w1"  : "b",
  "0r0"  : "s",
  "0r1"  : "c",
  "1r0"  : "b",
  "1r1"  : "b",
  "0b0"  : "s",
  "0b1"  : "d",
  "1b0"  : "p",
  "1b1"  : "p",
  "0br0" : "s",
  "0br1" : "p",
  "1br0" : "s",
  "1br1" : "d",
};

let normalizeColors = function(colors) {
  let hasRed = colors.includes("r");
  let hasBlue = colors.includes("b");
  if (hasRed && hasBlue) {
    return "br";
  }
  if (hasRed) {
    return "r";
  }
  if (hasBlue) {
    return "b";
  }
  return "w";
};

let boolToInt = function(boolean) {
  return boolean ? 1 : 0;
};

let shouldCut = function(led, colors, star) {
  colors = normalizeColors(colors);
  let solution = solutions[`${boolToInt(led)}${colors}${boolToInt(star)}`];
  return instructions[solution];
};

module.exports = {
  shouldCut,
};
