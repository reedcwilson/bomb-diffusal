'use strict';

let constants = require("./constants");

let holdInstructions = function(color) {
  if (color === constants.BLUE) {
    return 4;
  }
  if (color === constants.YELLOW) {
    return 5;
  }
  return 1;
};

let pressButton = function(color, word, numBatteries, frk) {
  //if the button is blue and the button says "Abort", hold the button and
  //refer to "Releasing a Held Button".
  if (color === constants.BLUE && word === "abort") {
    return constants.HOLD;
  }
  //if there is more than 1 battery on the bomb and the button says "Detonate",
  //press and immediately release the button.
  if (numBatteries > 1 && word === "detonate") {
    return constants.IMMEDIATE;
  }
  //if the button is yellow or white or there are more than 2 batteries on the
  //bomb and there is a lit indicator with label FRK, press and immediately
  //release the button.
  if (color === constants.WHITE || color === constants.YELLOW || numBatteries > 2 && frk === constants.YES) { 
    return constants.HOLD;
  }
  // if we don't know about batteries or lit indicator then ask
  if (numBatteries === -1 && frk === constants.YES || !frk && numBatteries > 2 || numBatteries === -1 && !frk) {
      return constants.INDETERMINATE;
  }
  //if the button is red and the button says "Hold", press and immediately
  //release the button.
  if (color === constants.RED && word === "hold") {
    return constants.IMMEDIATE;
  }
  //if none of the above apply, hold the button and refer to "Releasing a Held
  //Button".
  return constants.HOLD;
};

module.exports = {
  press: pressButton,
  hold: holdInstructions,
};
