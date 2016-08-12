'use strict';

let constants = require('./constants');

let buildObject = function(a, b, obj={}) {
  obj[a] = b;
  return obj;
};

let buildConversions = function() {
  let noStrikes = buildObject(constants.RED, constants.BLUE);
  buildObject(constants.BLUE, constants.RED, noStrikes);
  buildObject(constants.GREEN, constants.YELLOW, noStrikes);
  buildObject(constants.YELLOW, constants.GREEN, noStrikes);

  let oneStrikes = buildObject(constants.RED, constants.YELLOW);
  buildObject(constants.BLUE, constants.GREEN, oneStrikes);
  buildObject(constants.GREEN, constants.BLUE, oneStrikes);
  buildObject(constants.YELLOW, constants.RED, oneStrikes);

  let twoStrikes = buildObject(constants.RED, constants.GREEN);
  buildObject(constants.BLUE, constants.RED, twoStrikes);
  buildObject(constants.GREEN, constants.YELLOW, twoStrikes);
  buildObject(constants.YELLOW, constants.BLUE, twoStrikes);

  let containsVowel = [noStrikes, oneStrikes, twoStrikes];

  noStrikes = buildObject(constants.RED, constants.BLUE);
  buildObject(constants.BLUE, constants.YELLOW, noStrikes);
  buildObject(constants.GREEN, constants.GREEN, noStrikes);
  buildObject(constants.YELLOW, constants.RED, noStrikes);

  oneStrikes = buildObject(constants.RED, constants.RED);
  buildObject(constants.BLUE, constants.BLUE, oneStrikes);
  buildObject(constants.GREEN, constants.YELLOW, oneStrikes);
  buildObject(constants.YELLOW, constants.GREEN, oneStrikes);

  twoStrikes = buildObject(constants.RED, constants.YELLOW);
  buildObject(constants.BLUE, constants.GREEN, twoStrikes);
  buildObject(constants.GREEN, constants.BLUE, twoStrikes);
  buildObject(constants.YELLOW, constants.RED, twoStrikes);

  let noVowel = [noStrikes, oneStrikes, twoStrikes];

  return {"true": containsVowel, "false": noVowel};
};

let says = (strikes, serialHasVowel, color) => {
  let conversions = buildConversions();
  return conversions[String(serialHasVowel)][strikes][color];
};

module.exports = {
  says
};
