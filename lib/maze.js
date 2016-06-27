'use strict';

let mazeData = require('./maze-data.js');

// [
// [ 0, 0, 0, 0, 0, 0 ],
// ...
// ]

const COLS  = 6,
      ROWS  = 6,
      UP    = 0x1,
      RIGHT = 0x2,
      DOWN  = 0x4,
      LEFT  = 0x8;

let initializeMaze = function(rows, cols) {
  let maze = [];
  for (let i = 0; i < rows; i++) {
    maze.push(Array(cols).fill(0));
  }
  return maze;
};

let parseMazes = function(mazeData) {
  for (let mazeObj of mazeData) {
    let maze = initializeMaze(ROWS, COLS);
    let lines = mazeObj.mazeData.split("\n");
    lines.shift();
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (lines[y][x*2+1] !== " ") {
          maze[x][y] |= UP;
        }
        if (lines[y+1][x*2] === "|") {
          maze[x][y] |= LEFT;
        }
        if (lines[y+1][x*2+1] !== " ") {
          maze[x][y] |= DOWN;
        }
        if (lines[y+1][x*2+2] === "|") {
          maze[x][y] |= RIGHT;
        }
      }
    }
    mazeObj.maze = maze;
  }
};

let printMaze = function(maze) {
  console.log(".___________.");
  for (let y = 0; y < ROWS; y++) {
    process.stdout.write("|");
    for (let x = 0; x < COLS; x++) {
      if ((maze[x][y] & DOWN) !== 0) {
        process.stdout.write("_");
      }
      else {
        process.stdout.write(" ");
      }
      if ((maze[x][y] & RIGHT) !== 0) {
        process.stdout.write("|");
      }
      else {
        process.stdout.write(".");
      }
    }
    process.stdout.write('\n');
  }
};

let coordsEqual = function(first, second) {
  return first[0] === second[0] && first[1] === second[1];
};

let translate = function(coord, direction) {
  if (direction === LEFT) {
    return [coord[0]-1, coord[1]];
  }
  if (direction === UP) {
    return [coord[0], coord[1]-1];
  }
  if (direction === RIGHT) {
    return [coord[0]+1, coord[1]];
  }
  if (direction === DOWN) {
    return [coord[0], coord[1]+1];
  }
};

// array of coords
let traverseMaze = function(maze, start, end, entered) {
  if (coordsEqual(start, end)) {
    return [start];
  }
  let cur = maze[start[0]][start[1]];
  for (let direction of [UP, DOWN, LEFT, RIGHT]) {
    if ((cur & direction) === 0 && !coordsEqual(entered, translate(start, direction))) {
      let foundCoords = traverseMaze(maze, translate(start, direction), end, start);
      if (foundCoords) {
        foundCoords.unshift(start);
        return foundCoords;
      }
    }
  }
  return false;
};

let convertCoord = function(coord) {
  return translate(translate(coord, LEFT), UP);
};

let getPath = function(circle, start, end) {
  let maze = mazeData.find(m => {
    return m.coords.some(coord => {
      return coordsEqual(coord, circle);
    });
  });
  return traverseMaze(maze.maze, convertCoord(start), convertCoord(end), [-1, -1]);
};

parseMazes(mazeData);

module.exports = {
  getPath,
};
