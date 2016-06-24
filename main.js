'use strict';

let wires = require('./wires'),
    button = require('./button'),
    keypad = require('./keypad'),
    memory = require('./memory'),
    morse = require('./morse'),
    complicatedWires = require('./complicated-wires'),
    wireSequences = require('./wire-sequences.js'),
    maze = require('./maze');

let main = function() {
  //console.log(wires.cut('rkyr', '2'));
  //console.log(button.press('r', 'abort', '3', 'y', 'n'));
  //console.log(keypad.find('4', '1', '6', '5'));
  //console.log(morse.interpret(".-.-b-.-"));
  //console.dir(complicatedWires.shouldCut(true, 'w', false));
  //console.log(wireSequences.shouldCut();
//"coords": [[1,2], [6,3]],
  console.log(maze.getPath([1, 2], [3, 5], [6, 4]));
};

main();
