'use strict';

let positions = {
  "yes"      : ["middle", "left"],
  "first"    : ["top", "right"],
  "display"  : ["bottom", "right"],
  "okay"     : ["top", "right"],
  "says"     : ["bottom", "right"],
  "nothing"  : ["middle", "left"],
  ""         : ["bottom", "left"],
  "blank"    : ["middle", "right"],
  "no"       : ["bottom", "right"],
  "led"      : ["middle", "left"],
  "lead"     : ["bottom", "right"],
  "read"     : ["middle", "right"],
  "red"      : ["middle", "right"],
  "reed"     : ["bottom", "left"],
  "leed"     : ["bottom", "left"],
  "hold on"  : ["bottom", "right"],
  "you"      : ["middle", "right"],
  "you are"  : ["bottom", "right"],
  "your"     : ["top", "right"],
  "you're"   : ["top", "right"],
  "ur"       : ["top", "left"],
  "there"    : ["bottom", "right"],
  "they're"  : ["bottom", "left"],
  "their"    : ["top", "right"],
  "they are" : ["middle", "left"],
  "see"      : ["bottom", "right"],
  "c"        : ["top", "right"],
  "cee"      : ["bottom", "right"],
};

let words = {
  "READY"   : "YES, OKAY, WHAT, MIDDLE, LEFT, PRESS, RIGHT, BLANK, READY",
  "FIRST"   : "LEFT, OKAY, YES, MIDDLE, NO, RIGHT, NOTHING, UHHH, WAIT, READY, BLANK, WHAT, PRESS, FIRST",
  "NO"      : "BLANK, UHHH, WAIT, FIRST, WHAT, READY, RIGHT, YES, NOTHING, LEFT, PRESS, OKAY, NO",
  "BLANK"   : "WAIT, RIGHT, OKAY, MIDDLE, BLANK",
  "NOTHING" : "UHHH, RIGHT, OKAY, MIDDLE, YES, BLANK, NO, PRESS, LEFT, WHAT, WAIT, FIRST, NOTHING",
  "YES"     : "OKAY, RIGHT, UHHH, MIDDLE, FIRST, WHAT, PRESS, READY, NOTHING, YES",
  "WHAT"    : "UHHH, WHAT",
  "UHHH"    : "READY, NOTHING, LEFT, WHAT, OKAY, YES, RIGHT, NO, PRESS, BLANK, UHHH",
  "LEFT"    : "RIGHT, LEFT",
  "RIGHT"   : "YES, NOTHING, READY, PRESS, NO, WAIT, WHAT, RIGHT",
  "MIDDLE"  : "BLANK, READY, OKAY, WHAT, NOTHING, PRESS, NO, WAIT, LEFT, MIDDLE",
  "OKAY"    : "MIDDLE, NO, FIRST, YES, UHHH, NOTHING, WAIT, OKAY",
  "WAIT"    : "UHHH, NO, BLANK, OKAY, YES, LEFT, FIRST, PRESS, WHAT, WAIT",
  "PRESS"   : "RIGHT, MIDDLE, YES, READY, PRESS",
  "YOU"     : "SURE, YOU ARE, YOUR, YOU'RE, NEXT, UH HUH, UR, HOLD, WHAT?, YOU",
  "YOU ARE" : "YOUR, NEXT, LIKE, UH HUH, WHAT?, DONE, UH UH, HOLD, YOU, U, YOU'RE, SURE, UR, YOU ARE",
  "YOUR"    : "UH UH, YOU ARE, UH HUH, YOUR",
  "YOU'RE"  : "YOU, YOU'RE",
  "UR"      : "DONE, U, UR",
  "U"       : "UH HUH, SURE, NEXT, WHAT?, YOU'RE, UR, UH UH, DONE, U",
  "UH HUH"  : "UH HUH",
  "UH UH"   : "UR, U, YOU ARE, YOU'RE, NEXT, UH UH",
  "WHAT?"   : "YOU, HOLD, YOU'RE, YOUR, U, DONE, UH UH, LIKE, YOU ARE, UH HUH, UR, NEXT, WHAT?",
  "DONE"    : "SURE, UH HUH, NEXT, WHAT?, YOUR, UR, YOU'RE, HOLD, LIKE, YOU, U, YOU ARE, UH UH, DONE",
  "NEXT"    : "WHAT?, UH HUH, UH UH, YOUR, HOLD, SURE, NEXT",
  "HOLD"    : "YOU ARE, U, DONE, UH UH, YOU, UR, SURE, WHAT?, YOU'RE, NEXT, HOLD",
  "SURE"    : "YOU ARE, DONE, LIKE, YOU'RE, YOU, HOLD, UH HUH, UR, SURE",
  "LIKE"    : "YOU'RE, NEXT, U, UR, HOLD, DONE, UH UH, WHAT?, UH HUH, YOU, LIKE"
}


let findPosition = function(word) {
  return positions[word];
};

let getWords = function(word) {
  return words[word];
};

module.exports = {
  findPosition,
  getWords,
};
