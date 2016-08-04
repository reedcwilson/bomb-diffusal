'use strict';

// 1: balloon
// 2: a with t
// 3: upside down y
// 4: harry potter
// 5: amazon warrior
// 6: h with tail
// 7: backward c
// 8: backward e
// 9: pig tail
// 10: empty star
// 11: upside down ?
// 12: copyright
// 13: butt chin
// 14: back to back k
// 15: half of an r
// 16: six
// 17: music note
// 18: b with t
// 19: smiley face
// 20: pitch fork
// 21: c
// 22: snake with antlers
// 23: filled in star
// 24: train tracks
// 25: ae
// 26: backward n
// 27: omega

let options = [
  [ 1, 2, 3, 4, 5, 6, 7 ],
  [ 8, 1, 7, 9, 10, 6, 11 ],
  [ 12, 13, 9, 14, 15, 3, 10 ],
  [ 16, 17, 18, 5, 14, 11, 19 ],
  [ 20, 19, 18, 21, 17, 22, 23 ],
  [ 16, 8, 24, 25, 20, 26, 27 ],
];

let has = (key, option) => option.find(num => {
  return num === parseInt(key);
});

let getIndexes = (option, one, two, three, four) => {
  let answer = [ option.indexOf(parseInt(one)), option.indexOf(parseInt(two)), option.indexOf(parseInt(three)), option.indexOf(parseInt(four)) ].sort();
  return [ option[answer[0]], option[answer[1]], option[answer[2]], option[answer[3]] ];
};

let findKeys = function(one, two, three, four) {
  let option = options.filter(col => {
    return has(one, col) && has(two, col) && has(three, col) && has(four, col);
  })[0];
  return getIndexes(option, one, two, three, four);
};

module.exports = {
  find: findKeys,
};
