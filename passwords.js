#!/usr/bin/env node

var words = ["about", "after", "again", "below", "could", "every", "first",
    "found", "great", "house", "large", "learn", "never", "other", "place",
    "plant", "point", "right", "small", "sound", "spell", "still", "study",
    "their", "there", "these", "thing", "think", "three", "water", "where",
    "which", "world", "would", "write"];

var f = function(first, last) {
  words.forEach(function(word) {
    if (first.indexOf(word[0]) !== -1 && last.indexOf(word[word.length - 1]) !== -1) {
      console.log(word);
    }
  });
};

f(process.argv[2], process.argv[3]);
