'use strict';

//rounds = [
//  { 
//    "number": 2,
//    "position": 3,
//  },
//  ...
//]

let firstRound = function(display) {
  return { "position": Math.max(2, parseInt(display)) };
};

let secondRound = function(display, rounds) {
  if (display == 1) {
    return { "label": 4 };
  }
  if (display == 2 || display == 4) {
    return { "position": rounds[0].position };
  }
  if (display == 3) {
    return { "position": 1 };
  }
};

let thirdRound = function(display, rounds) {
  if (display == 1) {
    return { "label": rounds[1].label };
  }
  if (display == 2) {
    return { "label": rounds[0].label };
  }
  if (display == 3) {
    return { "position": 3 };
  }
  if (display == 4) {
    return { "label": 4 };
  }
};

let fourthRound = function(display, rounds) {
  if (display == 1) {
    return { "position": rounds[0].position };
  }
  if (display == 2) {
    return { "position": 1 };
  }
  if (display == 3 || display == 4) {
    return { "position": rounds[1].position };
  }
};

let fifthRound = function(display, rounds) {
  if (display == 1) {
    return { "label": rounds[0].label };
  }
  if (display == 2) {
    return { "label": rounds[1].label };
  }
  if (display == 3) {
    return { "label": rounds[3].label };
  }
  if (display == 4) {
    return { "label": rounds[2].label };
  }
};

let roundFuncs = [ firstRound, secondRound, thirdRound, fourthRound, fifthRound ];

let getNumber = function(r, display, ...numbers) {
  let rounds = JSON.parse(JSON.stringify(r));
  let answer = roundFuncs[rounds.length](display, rounds);
  if (answer.position) {
    answer.label = numbers[answer.position-1];
  }
  else if (answer.label) {
    answer.position = numbers.indexOf(answer.label)+1;
  }
  rounds.push(answer);
  return [rounds, answer.label];
};

module.exports = {
  getNumber,
};
