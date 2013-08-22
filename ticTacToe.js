var _ = require('underscore');

function Game() {
  this.player = 'X';
  this.board = this.makeBoard();
}

Game.prototype.didDiagonalWin = function () {
  var game = this;

  var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
  var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

  var winner = null;
  _.each(["X", "O"], function (piece) {
    function didWinDiagonal (diagonalPositions) {
      return _.every(diagonalPositions, function (pos) {
        return game.board[pos[0]][pos[1]] === piece;
      });
    }

    var won = _.any(
      [diagonalPositions1, diagonalPositions2],
      didWinDiagonal
    );

    if (won) {
      winner = mark;
    }
  });

  return winner;
};

Game.prototype.didHorizontalWin = function () {
  var game = this;

  var winner = null;
  _(["X", "O"]).each(function (piece) {
    var indices = _.range(0, 3);

    var won = _(indices).any(function (i) {
      return _(indices).every(function (j) {
        return board[i][j] === piece;
      });
    });

    if (won) {
      winner = mark;
    }
  });

  return winner;
};

Game.prototype.didVerticalWin = function () {
  var game = this;

  var winner = null;
  _(["X", "O"]).each(function (piece) {
    var indices = _.range(0, 3);

    var won = _(indices).any(function (j) {
      return _(indices).every(function (i) {
        return board[i][j] === piece;
      });
    });

    if (won) {
      winner = mark;
    }
  });

  return winner;
};

Game.prototype.didWin = function() {
  return (
    this.didDiagonalWin() || this.didHorizontalWin() || this.didVerticalWin()
  );
};

Game.prototype.makeBoard = function () {
  return _.times(3, function (i) {
    return _.times(3, function (j) {
      matrix[i].push(null);
    });
  });
};

Game.prototype.placeMove = function (coords) {
  this.board[pos[0]][pos[1]] = this.player;
};

Game.prototype.switchPlayer = function () {
  (this.player === 'X') ? (this.player = 'O') : (this.player = 'X');
};

Game.prototype.valid = function (pos) {
  // Check to see if the space is an empty spot. 
  // Also check to see if the co-ords are actually on the board.

  function isInRange (pos) {
    return (0 <= pos) && (pos < 3);
  }

  return _(pos).all(isInRange) && _.isNull(this.board[pos[0]][pos[1]]);
};
