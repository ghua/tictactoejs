var TicTacToe = (function () {

    function TicTacToe() {
        this.winningPositions = [
            7,   // 000000111
            56,  // 000111000
            73,  // 001001001
            84,  // 001010100
            146, // 010010010
            273, // 100010001
            292, // 100100100
            448  // 111000000
        ];

        this.possiblePositions = [];
        for (var n = 0; n < 9; n++) {
            this.possiblePositions[n] = Math.pow(2, n);
        }
        this.searchOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];

        this.reset();
    }

    TicTacToe.prototype.reset = function () {
        this.boards = [0, 0, 1, 0]; // x, o, side: 0 = o; x = 1
        this.lastBestMove = undefined;
    };

    TicTacToe.prototype.getNextStepSide = function () {
        return this.boards[2];
    };

    TicTacToe.prototype.setNextStepSide = function (side) {
        if (side > 1 || side < 0) {
            throw 'Side must be 0 for O or 1 for X'
        }

        this.boards[2] = this.boards[3] = side;
    };

    TicTacToe.prototype.setBoardPosition = function (state) {
        this.boards[this.boards[2]] = state;

        return this;
    };

    TicTacToe.prototype.getBoardBySide = function (side) {
        if (this.boards[side]) {
            return this.boards[side];
        }

        return this.boards[this.boards[2]];
    };

    TicTacToe.prototype.flipSide = function () {
        this.boards[2] ^= 1;

        return this;
    };

    TicTacToe.prototype.isMovePossible = function (n) {
        if (n < 0 || n > 8) {
            return false;
        }

        return ((this.boards[0] | this.boards[1]) & this.possiblePositions[n]) === 0;
    };

    TicTacToe.prototype.move = function (n, gameover) {
        if (!this.isMovePossible(n)) {
            throw 'Illegal move';
        }

        this.setBoardPosition(this.getBoardBySide() | this.possiblePositions[n]);

        if (typeof gameover === 'function' && this.checkForGameOver() >= 0) {
           gameover();
        }

        this.flipSide();

        return this;
    };

    TicTacToe.prototype.checkForGameOver = function () {
        for (var n = 0; n < this.winningPositions.length; n++) {
            var wp = this.winningPositions[n];
            for (var i = 0; i < 2; i++) {
                if ((this.boards[i] & wp) === wp) {
                    return (wp << 1) + i;
                }
            }
        }

        if ((this.boards[0] | this.boards[1]) === 511) {
            return 0;
        }

        return -Infinity;
    };

    TicTacToe.prototype.estimatePosition = function (depth) {
        var wp = this.checkForGameOver();
        if (wp > 0) {
            var isInitialSide = this.boards[3];
            var isXWon = (wp-1 >> 1) === (wp >> 1);
            if (isInitialSide !== (isXWon ? 0 : 1)) {
                return 10 - depth;
            }

            return depth - 10;
        }

        return wp;
    };

    TicTacToe.prototype.cloneBoard = function () {
        var boards = [];
        for (var i = 0; i < this.boards.length; i++) {
            boards[i] = this.boards[i];
        }

        return boards;
    };

    TicTacToe.prototype.think = function () {
        this.lastBestMove = undefined;
        if (this.checkForGameOver() < 0) {
            this._find(0, this.getNextStepSide());
            return this.lastBestMove;
        }

        return -1;
    };


    TicTacToe.prototype._find = function (depth) {
        var score, best = undefined;

        if (depth > 0) {
            score = this.estimatePosition(depth);
            if (score > -Infinity) {
                return score;
            }
        }

        for (var n, i = 0; i < this.searchOrder.length; i++) {
            n = this.searchOrder[i];
            if (!this.isMovePossible(n)) {
                continue;
            }

            var boards = this.cloneBoard();
            this.move(n);
            score = this._find(depth+1);

            this.boards = boards;

            if (depth % 2 === 0) { // max side
                if (best === undefined || score > best) {
                    best = score;
                    if (depth === 0) {
                        this.lastBestMove = n;
                    }
                }
            } else { // min side
                if (best === undefined || score < best) {
                    best = score;
                }
            }
        }

        return best;
    };

    TicTacToe.prototype.getPositionNumber = function(n)
    {
        var possiblePosition = this.possiblePositions[n];
        if (possiblePosition === undefined) {
            throw 'Invalid position';
        }

        for (var i = 0; i < 2; i++) {
            if ((this.boards[i] & possiblePosition) === possiblePosition) {
                return i;
            }
        }

        return -1;
    };

    TicTacToe.prototype.drawBoard = function () {
        var n = 8;
        var board = '';
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                if (c === 0) {
                    board += ' ';
                }
                if (c > 0 && c < 3) {
                    board += '|';
                }

                switch (this.getPositionNumber(n)) {
                    case 0:
                        board += 'o';
                        break;
                    case 1:
                        board += 'x';
                        break;
                    default:
                        board += ' ';
                }

                n--;
            }
            if (r < 2) {
                board += "\n-------\n";
            }
        }

        return board;
    };

    return TicTacToe;
}());

if (typeof module === 'object') {
    module.exports = new TicTacToe();
}



