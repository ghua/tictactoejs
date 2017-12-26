const tictactoe = require('./tictactoe.js');
const assert = require('assert');

/**
 * test think
 *
 * x| |o
 * -----
 *  |x
 * -----
 * o| |
 */
tictactoe.boards = [ /* o: */ 65, /* x: */ 272, 0 ]; // o: 001000001, x: 100010000, x
assert.equal(3, tictactoe.think());

/**
 * 0) o = 328; x = 177;
 *
 * o|x|o
 * -----
 * x|x|o
 * -----
 *  | |x
 *
 *
 * 1.1) o = 330; x = 181
 *
 * o|x|o
 * -----
 * x|x|o
 * -----
 * x|o|x
 *
 *
 * 1.2) o = 332; x = 177
 *
 * o|x|o
 * -----
 * x|x|o
 * -----
 * o| |x
 *
 *
 * 1.3) o = 332; x = 179
 *
 * o|x|o
 * -----
 * x|x|o
 * -----
 * o|x|x
 *
 */
tictactoe.boards = [328, 177, 0, 0];
assert.equal(1, tictactoe.think());

/**
 * test checkForGameOver
 */

for (var n = 0; n < 2; n++) {
    tictactoe.reset();
    tictactoe.setNextStepSide(n);
    tictactoe.setBoardPosition(0);
    assert.equal(-1, tictactoe.checkForGameOver());
    tictactoe.setBoardPosition(73); // 001001001
    assert.equal((73 << 1) + n, tictactoe.checkForGameOver());
    tictactoe.reset();
    tictactoe.setNextStepSide(n);
    tictactoe.setBoardPosition(448); // 111000000
    assert.equal((448 << 1) + n, tictactoe.checkForGameOver());
    tictactoe.reset();
    tictactoe.setNextStepSide(n);
    tictactoe.setBoardPosition(418); // 110100010
    assert.equal(-1, tictactoe.checkForGameOver());
    tictactoe.reset();
    tictactoe.setNextStepSide(n);
    tictactoe.setBoardPosition(480); // 111100000
    assert.equal((448 << 1) + n, tictactoe.checkForGameOver());
    tictactoe.reset();
    tictactoe.setNextStepSide(n);
    tictactoe.setBoardPosition(480); // 111100000
    tictactoe.flipSide();
    tictactoe.setBoardPosition(31);
    assert.equal((7 << 1) + (n ^ 1), tictactoe.checkForGameOver());
}


/**
 * test move
 */
tictactoe.reset();
tictactoe.move(0);
assert.equal(1, tictactoe.getBoardBySide(1));
assert.equal(0, tictactoe.getNextStepSide());
tictactoe.move(1);
assert.equal(2, tictactoe.getBoardBySide(0));
assert.equal(1, tictactoe.getNextStepSide());

/**
 * test flipSide
 */
tictactoe.reset();
tictactoe.flipSide();
assert.equal(0, tictactoe.getNextStepSide());
tictactoe.flipSide();
assert.equal(1, tictactoe.getNextStepSide());

/**
 * test isMovePossible
 */
tictactoe.reset();
assert.ok(!tictactoe.isMovePossible(9));
assert.ok(!tictactoe.isMovePossible(-1));

tictactoe.setBoardPosition(0); // 000000000
assert.ok(tictactoe.isMovePossible(0));
assert.ok(tictactoe.isMovePossible(1));
assert.ok(tictactoe.isMovePossible(2));
assert.ok(tictactoe.isMovePossible(3));
assert.ok(tictactoe.isMovePossible(4));
assert.ok(tictactoe.isMovePossible(5));
assert.ok(tictactoe.isMovePossible(6));
assert.ok(tictactoe.isMovePossible(7));
assert.ok(tictactoe.isMovePossible(8));

tictactoe.setBoardPosition(1); // 000000001
assert.ok(!tictactoe.isMovePossible(0));
assert.ok(tictactoe.isMovePossible(1));
assert.ok(tictactoe.isMovePossible(2));
assert.ok(tictactoe.isMovePossible(3));
assert.ok(tictactoe.isMovePossible(4));
assert.ok(tictactoe.isMovePossible(5));
assert.ok(tictactoe.isMovePossible(6));
assert.ok(tictactoe.isMovePossible(7));
assert.ok(tictactoe.isMovePossible(8));

tictactoe.setBoardPosition(7); // 000000111
assert.ok(!tictactoe.isMovePossible(0));
assert.ok(!tictactoe.isMovePossible(1));
assert.ok(!tictactoe.isMovePossible(2));
assert.ok(tictactoe.isMovePossible(3));
assert.ok(tictactoe.isMovePossible(4));
assert.ok(tictactoe.isMovePossible(5));
assert.ok(tictactoe.isMovePossible(6));
assert.ok(tictactoe.isMovePossible(7));
assert.ok(tictactoe.isMovePossible(8));
