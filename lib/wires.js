'use strict';

let numberOfWires = function(colors, color) {
  var num = 0;
  colors.forEach(c => c === color && num++);
  return num;
};

let lastColor = function(colors) {
  return colors[colors.length-1];
};

let three = function(colors) {
  // if there are no red wires, cut the second wire.
  if (colors.indexOf("r") === -1) {
    return "cut the second wire";
  }
  // if the last wire is white, cut the last wire.
  if (lastColor(colors) === "w") {
    return "cut the last wire";
  }
  // if there is more than one blue wire, cut the last blue wire.
  if (numberOfWires(colors, "b") > 1) {
    return "cut the last blue wire";
  }
  // cut the last wire.
  return "cut the last wire";
};

let four = function(colors, isOdd) {
  let numRedWires = numberOfWires(colors, "r");
  // if there is more than one red wire and the last digit of the serial number
  // is odd, cut the last red wire.
  if (numRedWires > 1 && isOdd) {
    return "cut the last red wire";
  }
  // if the last wire is yellow and there are no red wires, cut the first wire
  // or if there is exactly one blue wire.
  if (lastColor(colors) === "y" && numRedWires === 0 || numberOfWires(colors, "b") === 1) {
    return "cut the first wire";
  }
  // if there is more than one yellow wire, cut the last wire.
  if (numberOfWires(colors, "y" > 1)) {
    return "cut the last wire";
  }
  // cut the second wire.
  return "cut the second wire";
  
};

let five = function(colors, isOdd) {
  // if the last wire is black and the last digit of the serial number is odd, cut the fourth wire.
  if (lastColor(colors) === "k" && isOdd) {
    return "cut the fourth wire";
  }
  // if there is exactly one red wire and there is more than one yellow wire, cut the first wire.
  if (numberOfWires(colors, "r") === 1 && numberOfWires(colors, "y" > 1)) {
    return "cut the first wire";
  }
  // if there are no black wires, cut the second wire.
  if (numberOfWires(colors, "k") === 0) {
    return "cut the second wire";
  }
  // cut the first wire.
  return "cut the first wire";
};

let six = function(colors, isOdd) {
  // if there are no yellow wires and the last digit of the serial number is odd, cut the third wire.
  if (numberOfWires(colors, "y") === 0 && isOdd) {
    return "cut the third wire";
  }
  // if there is exactly one yellow wire and there is more than one white wire, cut the fourth wire.
  if (numberOfWires(colors, "y") === 1 && numberOfWires(colors, "w" > 1)) {
    return "cut the fourth wire";
  }
  // if there are no red wires, cut the last wire.
  if (numberOfWires(colors, "r") === 0) {
    return "cut the last wire";
  }
  // cut the fourth wire.
  return "cut the fourth wire";
};


let cutWire = function(colorsStr, isOdd) {
  let colors = colorsStr.split("");
  switch (colors.length) {
    case 3:
      return three(colors)
    case 4:
      return four(colors, isOdd);
    case 5:
      return five(colors, isOdd);
    case 6:
      return six(colors, isOdd);
    default:
      return "incorrect number of wires";
  }
};

module.exports = {
  cut: cutWire,
};
