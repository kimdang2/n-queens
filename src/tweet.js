var countSolutions = function(boardSize, leftDiag, column, rightDiag, solutionCount, queenPlacements, rightmostQueen) {
  solutionCount = 0;
  boardSize = leftDiag ? boardSize : (1 << boardSize) - 1;
  queenPlacements =~ (leftDiag | column | rightDiag) & boardSize;
  while (H) {
    queenPlacements ^= rightmostQueen =- queenPlacements & queenPlacements,
    s += countSolutions(boarightmostQueendSize,
    (leftDiag | rightmostQueen) << 1,
    column | rightmostQueen,
    (rightDiag | rightmostQueen) >> 1);
  }
  return solutionCount += column == boardSize;
};



// function N(Q, u, ee, n, s, H, R) {
//   s = 0;
//   Q = u ? Q:(1 << Q) - 1;
//   H = ~(u | ee | n) & Q;
//   while(H) {
//     H ^= R= -H & H,
//     s += N(Q,(u|R) << 1, ee|R, (n|R) >> 1);
//     return s += ee==Q;
//   }
// }