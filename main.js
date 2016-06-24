'use strict';

let wires = require('./wires'),
    button = require('./button'),
    keypad = require('./keypad'),
    memory = require('./memory'),
    morse = require('./morse'),
    complicatedWires = require('./complicated-wires'),
    wireSequences = require('./wire-sequences.js');

let main = function() {
  //console.log(wires.cut('rkyr', '2'));
  //console.log(button.press('r', 'abort', '3', 'y', 'n'));
  //console.log(keypad.find('4', '1', '6', '5'));
  //console.log(morse.interpret(".-.-b-.-"));
  //console.dir(complicatedWires.shouldCut(true, 'w', false));
  console.log(wireSequences.shouldCut();
};

main();
