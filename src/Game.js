import { COMPUTER_MOVE_SYMBOL, USER_MOVE_SYMBOL } from '../constants/moveSymbol';
import { COMPUTER_NAME, USER_NAME } from '../constants/playerName';
import { FIELD_SIZE } from '../constants/fieldSize';
import { TAKEN_CELL } from '../constants/texts';

export class Game {
    constructor() {
        this._board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this._history = [];
    }

    getState() {
        return this._board;
    }

    getMoveHistory() {
        return this._history;
    }

    acceptUserMove(x, y) {
        if (!this._isCellFree(x, y)) {
            return this._throwException(TAKEN_CELL);
        }

        this._updateHistory(USER_NAME, x, y);
        this._updateBoard(x, y);
    }

    createComputerMove() {
        const x = this._getRandomCoordinate();
        const y = this._getRandomCoordinate();

        this._updateHistory(COMPUTER_NAME, x, y);
        this._updateBoard(x, y, {
            symbol: COMPUTER_MOVE_SYMBOL
        });
    }

    _updateBoard(x, y, config = {}) {
        const {symbol = USER_MOVE_SYMBOL} = config;
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

    _getRandomCoordinate() {
        return Math.floor(Math.random() * FIELD_SIZE);
    }
}