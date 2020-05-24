/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// myBoard.row() = returns all your rows
// myBoard.toggle(rowIdx, columnIdx) = adds a piece on the board

window.findNRooksSolution = function(n) {
  var solution = 0; //fixme
  // build out n x n board
  var newBoard = new Board({n: n});
  for (var i = 0; i < n; i++) {
    newBoard.togglePiece(i, i);
  }
  // if (newBoard.hasAnyRooksConflicts() === false) {
  //   solution++;
  // }
  return newBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //return solution; // [ [1, 0, 0], [0,1,0], [0,0,1]] -> [0,0] [1,1], [2,2]
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var newBoard = new Board({n: n});

  var countSolutions = function(n, row, newBoard) {
    // base case - out of rows to place rook on, on a n x n board
    if (row === n) {
      solutionCount++;
      return;
    }
    // traverse though col for each row
    for (var col = 0; col < n; col++) {
      // add rook on board at [row,col]
      newBoard.togglePiece(row, col);
      // if there are no conflicts, move to the next row
      if (newBoard.hasAnyRooksConflicts() === false) {
        countSolutions(n, row + 1, newBoard);
      }
      // otherwise, remove the current rook at [row,col]
      newBoard.togglePiece(row, col);
    }
  };
  countSolutions(n, 0, newBoard);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = 0;
  var newBoard = new Board({n: n});

  var countSolutions = function(n, row, newBoard) {
    if (row === n) {
      solution++;
      return;
    }

    for (var i = 0; i < n; i++) {
      newBoard.togglePiece(row, i);
      if (newBoard.hasAnyQueensConflicts()) {
        newBoard.togglePiece(row, i);
      } else {
        countSolutions(n, row + 1, newBoard);
        if (solution === 1) {
          return;
        }
        newBoard.togglePiece(row, i);
      }
    }
  };
  countSolutions(n, 0, newBoard);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return newBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var newBoard = new Board({n: n});

  var countSolutions = function(n, row, newBoard) {
    // base case - out of rows to place rook on, on a n x n board
    if (row === n) {
      solutionCount++;
      return;
    }
    // traverse though col for each row
    for (var col = 0; col < n; col++) {
      // add rook on board at [row,col]
      newBoard.togglePiece(row, col);
      // if there are no conflicts, move to the next row
      if (newBoard.hasAnyQueensConflicts() === false) {
        countSolutions(n, row + 1, newBoard);
      }
      // otherwise, remove the current rook at [row,col]
      newBoard.togglePiece(row, col);
    }
  };
  countSolutions(n, 0, newBoard);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};