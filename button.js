#!/usr/bin/env node

var printHoldInstructions = function() {
  console.log("Blue strip: release when the countdown timer has a 4 in any position.");
  console.log("White strip: release when the countdown timer has a 1 in any position.");
  console.log("Yellow strip: release when the countdown timer has a 5 in any position.");
  console.log("Any other color strip: release when the countdown timer has a 1 in any position.");
};

var f = function(color, word, numBatteries, car, frk) {
  //if the button is blue and the button says "Abort", hold the button and refer to "Releasing a Held Button".
  if (color === "b" && word === "abort") {
    console.log("press and hold button");
    printHoldInstructions();
    return;
  }
  //if there is more than 1 battery on the bomb and the button says "Detonate", press and immediately release the button.
  if (numBatteries > 1 && word === "detonate") {
    console.log("press and immediately release");
    return;
  }
  //if the button is white and there is a lit indicator with label CAR, hold the button and refer to "Releasing a Held Button".
  if (color === "w" && car === "y") {
    console.log("press and hold button");
    printHoldInstructions();
    return;
  }
  //if there are more than 2 batteries on the bomb and there is a lit indicator with label FRK, press and immediately release the button.
  if (numBatteries > 2 && frk === "y") {
    console.log("press and hold button");
    printHoldInstructions();
    return;
  }
  //if the button is yellow, hold the button and refer to "Releasing a Held Button".
  if (color === "y") {
    console.log("press and hold button");
    printHoldInstructions();
    return;
  }
  //if the button is red and the button says "Hold", press and immediately release the button.
  if (color === "r" && word === "hold") {
    console.log("press and immediately release");
    return;
  }
  //if none of the above apply, hold the button and refer to "Releasing a Held Button".
  console.log("press and hold button");
  printHoldInstructions();
};

var args = process.argv;
f(args[2], args[3], args[4], args[5], args[6]);
