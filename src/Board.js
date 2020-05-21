// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set( makeEmptyMatrix(this.size()) );
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // just for convenience
    size: function() {
      return this.get('n');
    },

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      return _.reduce(this.get(rowIndex), (acc, elem) => acc + elem, 0) > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (let i = 0; i < this.size(); i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
      // var x = this;
      // return !_.every( _.range(x.get('n')), this.hasRowConflictAt.bind(x) );
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      for (let i = 0; i < this.size(); i++) {
        if (this.get(i)[colIndex]) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (let i = 0; i < this.size(); i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var count2 = 0;
      var column = majorDiagonalColumnIndexAtFirstRow;
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        var diagonal = board[i][column + i];
        // console.log('diagonal1', diagonal);
        if (diagonal !== undefined) {
          count += diagonal;
          // console.log('count', count);
        }

        if (board[column + i] && board[column + i][i] !== undefined) {
          var diagonal2 = board[column + i][i];
          // console.log('diagonal2', diagonal2);
          // if (diagonal2 !== undefined) {
          count2 += diagonal2;
          // console.log('count', count);
          // }
        }
      }
      return count > 1 || count2 > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // var arr = [];
      // for (let i = 0; i < this.size(); i++) {
      //   arr = arr.concat( this.get(i) );
      // }
      // var firstIndex = arr.indexOf(1);
      // if (firstIndex > -1) {
      //   for ( let i = firstIndex + this.size() + 1; i < arr.length; i += this.size() + 1 ) {
      //     if (arr[i]) {
      //       return true;
      //     }
      //   }
      // }
      // return false;

      for (let i = 0; i < this.size(); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // var count = 0;
      // var count2 = 0;
      // var column = minorDiagonalColumnIndexAtFirstRow;
      // var board = this.rows();
      // for (var i = 0; i < board.length; i++) {
      //   var diagonal = board[i][column];
      //   console.log('diagonal1', diagonal);
      //   if (diagonal !== undefined) {
      //     count += diagonal;
      //     console.log('count', count);
      //   }

      //   if (board[column] && board[column][i] !== undefined) {
      //     var diagonal2 = board[column][i];
      //     console.log('diagonal2', diagonal2);
      //     // if (diagonal2 !== undefined) {
      //     count2 += diagonal2;
      //     console.log('count', count);
      //     // }
      //   }
      //   column--;
      // }
      // return count > 1 || count2 > 1;

      var board = this.rows();
      var count = 0;
      var column = minorDiagonalColumnIndexAtFirstRow;

      for (var row = 0; row < this.size(); row++) {
        var diagonal = board[row][column];
        if (diagonal === 1) {
          count++;
        }
        column--;
        console.log("column", column);
      }

      // var count2 = 0;
      // var column2 = minorDiagonalColumnIndexAtFirstRow;
      // for (var row = this.size() - 1; row > -1; row--) {
      //   if (board[row] && board[row][column2]) {
      //     var diagonal2 = board[row][column2];
      //     if (diagonal2 !== undefined) {
      //       count2 += diagonal2;
      //     }
      //   }
      //   // column--;
      //   console.log("column", column);
      // }
      // return count > 1 || count2 > 1;
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // var arr = [];
      // for (let i = 0; i < this.size(); i++) {
      //   arr = arr.concat( this.get(i) );
      // }
      // var firstIndex = arr.indexOf(1);
      // if (firstIndex > -1) {
      //   for ( let i = firstIndex + this.size() - 1; i < arr.length; i += this.size() - 1 ) {
      //     if (arr[i]) {
      //       return true;
      //     }
      //   }
      // }
      // return false;
      // for (let i = this.size() - 1; i > -1; i--) {
      //   if (this.hasMinorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false;
      for (var i = 0; i < this.size(); i++) {
        for (var j = 0; j < this.size(); j++) {
          var nathan = this._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
          if (this.hasMinorDiagonalConflictAt(nathan)) {
            return true;
          }
        }
      }
      return false;
    }
    /*--------------------  End of Helper Functions  ---------------------*/

  });



  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());