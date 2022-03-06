import { COMPUTER_MOVE_SYMBOL, USER_MOVE_SYMBOL } from '../constants/moveSymbol';
import { COMPUTER_NAME, USER_NAME } from '../constants/playerName';

export class Game {
    constructor() {
        this._board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this._history = [];
        this._userMoveSymbol = USER_MOVE_SYMBOL;
        this._computerMoveSymbol = COMPUTER_MOVE_SYMBOL;
    }

    getState() {
        return this._board;
    }

    getMoveHistory() {
        return this._history;
    }

    acceptUserMove(x, y) {
        if (!this._isCellFree(x, y)) {
            return this._throwException('cell is already taken');
        }
        this._updateHistory(USER_NAME, x, y);
        this._updateBoard(x, y);
    }

    createComputerMove(x, y) {
        this._updateHistory(COMPUTER_NAME, x, y);
        this._updateBoard(x, y, {
            symbol: this._computerMoveSymbol
        });
    }


    _updateBoard(x, y, config = {}) {
        const {symbol = this._userMoveSymbol} = config;
        this._board[x][y] = symbol;
    }

    _isCellFree(x, y) {
        return !this._board[x][y];
    }

    _throwException(msg) {
        throw new Error(msg);
    }

    _updateHistory(turn, x, y) {
        this._history.push({turn, x, y});
    }
}