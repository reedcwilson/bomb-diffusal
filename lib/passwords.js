'use strict';

let words = ["about", "after", "again", "below", "could", "every", "first",
    "found", "great", "house", "large", "learn", "never", "other", "place",
    "plant", "point", "right", "small", "sound", "spell", "still", "study",
    "their", "there", "these", "thing", "think", "three", "water", "where",
    "which", "world", "would", "write"];

let crack = function(first, last) {
  let words = [];
  words.forEach(function(word) {
    if (first.indexOf(word[0]) !== -1 && last.indexOf(word[word.length - 1]) !== -1) {
      words.push(word);
    }
  });
  return words;
};

module.exports = {
  crack,
};
