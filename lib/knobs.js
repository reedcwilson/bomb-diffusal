'use strict';

let getPosition = function(four, five) {
  if (four[0] === 0 && four[1] === 1 && five[0] === 1 && five[1] === 0) {
    return "UP";
  }
  if (four[0] === 0 && four[1] === 0 && five[0] === 1 && five[1] === 1) {
    return "UP";
  }
  if (four[0] === 0 && four[1] === 1 && five[0] === 0 && five[1] === 0) {
    return "DOWN";
  }
  if (four[0] === 0 && four[1] === 0 && five[0] === 1 && five[1] === 0) {
    return "DOWN";
  }
  if (four[0] === 0 && four[1] === 1 && five[0] === 1 && five[1] === 1) {
    return "LEFT";
  }
  if (four[0] === 1 && four[1] === 0 && five[0] === 1 && five[1] === 1) {
    return "RIGHT";
  }
  if (four[0] === 1 && four[1] === 0 && five[0] === 0 && five[1] === 1) {
    return "RIGHT";
  }
};

module.exports = {
  getPosition,
};
