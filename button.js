'use strict';

let getHoldInstructions = function() {
  return `\n\nBlue strip: release when the countdown timer has a 4 in any position.
White strip: release when the countdown timer has a 1 in any position.
Yellow strip: release when the countdown timer has a 5 in any position.
Any other color strip: release when the countdown timer has a 1 in any position.`;
};

let pressButton = function(color, word, numBatteries, car, frk) {
  //if the button is blue and the button says "Abort", hold the button and refer to "Releasing a Held Button".
  if (color === "b" && word === "abort") {
    return "press and hold button" + getHoldInstructions();
  }
  //if there is more than 1 battery on the bomb and the button says "Detonate", press and immediately release the button.
  if (numBatteries > 1 && word === "detonate") {
    return "press and immediately release";
  }
  //if the button is white and there is a lit indicator with label CAR, hold the button and refer to "Releasing a Held Button".
  if (color === "w" && car === "y") {
    return "press and hold button" + getHoldInstructions();
  }
  //if there are more than 2 batteries on the bomb and there is a lit indicator with label FRK, press and immediately release the button.
  if (numBatteries > 2 && frk === "y") {
    return "press and hold button" + getHoldInstructions();
  }
  //if the button is yellow, hold the button and refer to "Releasing a Held Button".
  if (color === "y") {
    return "press and hold button" + getHoldInstructions();
  }
  //if the button is red and the button says "Hold", press and immediately release the button.
  if (color === "r" && word === "hold") {
    return "press and immediately release";
  }
  //if none of the above apply, hold the button and refer to "Releasing a Held Button".
  return "press and hold button" + getHoldInstructions();
};

module.exports = {
  press: pressButton,
};
