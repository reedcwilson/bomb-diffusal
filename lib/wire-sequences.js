'use strict';

//colors = {
//  "k": 2,
//  "r": 3,
//  "b": 5,
//};

let redInstructions = [
  ["c"],
  ["b"],
  ["a"],
  ["a", "c"],
  ["b"],
  ["a", "c"],
  ["a", "b", "c"],
  ["a", "b"],
  ["b"],
];

let blueInstructions = [
  ["b"],
  ["a", "c"],
  ["b"],
  ["a"],
  ["b"],
  ["b", "c"],
  ["c"],
  ["a", "c"],
  ["a"],
];

let blackInstructions = [
  ["a", "b", "c"],
  ["a", "c"],
  ["b"],
  ["a", "c"],
  ["b"],
  ["b", "c"],
  ["a", "b"],
  ["c"],
];

let instructions = {
  "r": redInstructions,
  "b": blueInstructions,
  "k": blackInstructions,
};

let colors;

let init = function() {
  colors = {
    "r": 0,
    "b": 0,
    "k": 0,
  };
};

let shouldCut = function(color, letter) {
  let should = instructions[color][colors[color]].indexOf(letter) !== -1;
  if (should) {
    colors = colors[color]++;
  }
  return should;
};

module.exports = {
  init,
  shouldCut,
};
