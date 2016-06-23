'use strict';

let alphabetToMorseMap = {
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
};

let wordToFrequencyMap = {
  "shell"  : "3.505 MHz",
  "halls"  : "3.515 MHz",
  "slick"  : "3.522 MHz",
  "trick"  : "3.532 MHz",
  "boxes"  : "3.535 MHz",
  "leaks"  : "3.542 MHz",
  "strobe" : "3.545 MHz",
  "bistro" : "3.552 MHz",
  "flick"  : "3.555 MHz",
  "bombs"  : "3.565 MHz",
  "break"  : "3.572 MHz",
  "brick"  : "3.575 MHz",
  "steak"  : "3.582 MHz",
  "sting"  : "3.592 MHz",
  "vector" : "3.595 MHz",
  "beats"  : "3.600 MHz",
};

// no spaces in between letters
let morsify = function(words) {
  let morseToWords = {};
  for (let word of words) {
    let letters = word.split("");
    let morseLetters = [];
    for (let letter of letters) {
      morseLetters.push(alphabetToMorseMap[letter]);
    }
    morseToWords[morseLetters.join("")] = word;
  }
  return morseToWords;
};

let duplicate = function(morseWords) {
  let duplicates = {};
  for (let word in morseWords) {
    duplicates[`${word}b${word}`] = morseWords[word];
  }
  return duplicates;
};

let findMatch = function(wordsMap, flashes) {
  let morseWords = Object.keys(wordsMap);
  let matches = [];
  for (let word of morseWords) {
    if (word.includes(flashes)) {
      matches.push(wordsMap[word]);
    }
  }
  return matches;
};

let createFrequenciesString = function(words) {
  let frequencies = [];
  for (var word of words) {
    frequencies.push(`${word}: ${wordToFrequencyMap[word]}`);
  }
  return frequencies.join("\n");
};

// assuming that letters contain a 'b' for the break between instances of the
// word

let interpret = function(flashes) {
  let words = Object.keys(wordToFrequencyMap)
  let morseWords = duplicate(morsify(words));
  let matches = findMatch(morseWords, flashes);
  if (matches.length === 0) {
    return "no matches found";
  }
  return createFrequenciesString(matches);
};

//let findWords = function(words, morseLetters) {
  //return words.filter(word => {
    //return morseLetters.every(letter => {
      //return word.includes(morseToAlphabetMap[letter]);
    //});
  //});
//};

//// assuming spaces in between letters
//// e.g. "... .... . .-.. .-.." = shell

//let interpret = function(flashes) {
  //let morseLetters = flashes.split(" ");
  //let words = Object.keys(wordToFrequencyMap);
  //let matches = findWords(words, morseLetters);
  //if (matches.length === 0) {
    //return "no matches found";
  //}
  //if (matches.length === 1) {
    //return wordToFrequencyMap[matches[0]];
  //}
  //return createFrequenciesString(matches);
//};

module.exports = {
  interpret,
};
