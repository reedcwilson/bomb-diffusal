'use strict';

let constants = require('./constants');

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
  let hasRed = colors.includes(constants.RED);
  let hasBlue = colors.includes(constants.BLUE);
  if (hasRed && hasBlue) {
    return constants.BLUE + constants.RED;
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
  return solution;
};

module.exports = {
  shouldCut,
};
