#!/usr/bin/env node

var numberOfWires = function(colors, color) {
  var num = 0;
  colors.forEach(c => c === color && num++);
  return num;
};

var isOdd = function(number) {
  return number % 2;
};

var lastColor = function(colors) {
  return colors[colors.length-1];
};

var three = function(colors) {
  // if there are no red wires, cut the second wire.
  if (colors.indexOf("r") === -1) {
    console.log("cut the second wire");
    return;
  }
  // if the last wire is white, cut the last wire.
  if (lastColor(colors) === "w") {
    console.log("cut the last wire");
    return
  }
  // if there is more than one blue wire, cut the last blue wire.
  if (numberOfWires(colors, "b") > 1) {
    console.log("cut the last blue wire");
    return;
  }
  // cut the last wire.
  console.log("cut the last wire");
};

var four = function(colors, digit) {
  var numRedWires = numberOfWires(colors, "r");
  // if there is more than one red wire and the last digit of the serial number is odd, cut the last red wire.
  if (numRedWires > 1 && isOdd(digit)) {
    console.log("cut the last red wire");
    return;
  }
  // if the last wire is yellow and there are no red wires, cut the first wire.
  if (lastColor(colors) === "y" && numRedWires === 0) {
    console.log("cut the first wire");
    return;
  }
  // if there is exactly one blue wire, cut the first wire.
  if (numberOfWires(colors, "b") === 1) {
    console.log("cut the first wire");
    return;
  }
  // if there is more than one yellow wire, cut the last wire.
  if (numberOfWires(colors, "y") > 1) {
    console.log("cut the last wire");
    return;
  }
  // cut the second wire.
  console.log("cut the second wire");
  
};

var five = function(colors, digit) {
  // if the last wire is black and the last digit of the serial number is odd, cut the fourth wire.
  if (lastColor(colors) === "k" && isOdd(digit)) {
    console.log("cut the fourth wire");
    return;
  }
  // if there is exactly one red wire and there is more than one yellow wire, cut the first wire.
  if (numberOfWires(colors, "r") === 1 && numberOfWires(colors, "y") > 1) {
    console.log("cut the first wire");
    return;
  }
  // if there are no black wires, cut the second wire.
  if (numberOfWires(colors, "k") === 0) {
    console.log("cut the second wire");
    return;
  }
  // cut the first wire.
  console.log("cut the first wire");
};

var six = function(colors, digit) {
  // if there are no yellow wires and the last digit of the serial number is odd, cut the third wire.
  if (numberOfWires(colors, "y") === 0 && isOdd(digit)) {
    console.log("cut the third wire");
    return;
  }
  // if there is exactly one yellow wire and there is more than one white wire, cut the fourth wire.
  if (numberOfWires(colors, "y") === 1 && numberOfWires(colors, "w") > 1) {
    console.log("cut the fourth wire");
    return;
  }
  // if there are no red wires, cut the last wire.
  if (numberOfWires(colors, "r") === 0) {
    console.log("cut the last wire");
    return;
  }
  // cut the fourth wire.
  console.log("cut the fourth wire");
};


var f = function(colorsStr, digit) {
  var colors = colorsStr.split("");
  switch (colors.length) {
    case 3:
      three(colors)
      break;
    case 4:
      four(colors, digit);
      break;
    case 5:
      five(colors, digit);
      break;
    case 6:
      six(colors, digit);
      break;
    default:
      console.log("incorrect number of wires");
  }
};

f(process.argv[2], process.argv[3]);
