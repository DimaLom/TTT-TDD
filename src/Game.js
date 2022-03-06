import { COMPUTER_MOVE_SYMBOL, USER_MOVE_SYMBOL } from '../constants/moveSymbol';
import { COMPUTER_NAME, USER_NAME } from '../constants/playerName';
import { FIELD_SIZE } from '../constants/fieldSize';
import { TAKEN_CELL } from '../constants/texts';
import { getCount } from '../utils/getCount';

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
        const freeCells = getCount('', this._board);
        if (!freeCells) {
            return this._throwException('no cells available');
        }

        const [x, y] = this._getFreeRandomCoordinates();

        this._updateHistory(COMPUTER_NAME, x, y);
        this._updateBoard(x, y, {
            symbol: COMPUTER_MOVE_SYMBOL
        });
    }

    isWinner(player) {
        const symbol = this._getSymbolForPlayer(player);
        const range = [...Array(FIELD_SIZE).keys()];
        const isEqual = this._checkCellEqual(symbol);
        
        return range.reduce((res, i) =>
            isEqual(i, 0) && isEqual(i, 1) && isEqual(i, 2) || res, false);
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

    _getFreeRandomCoordinates() {
        let x = this._getRandomCoordinate();
        let y = this._getRandomCoordinate();

        while (!!this._board[x][y]) {
            x = this._getRandomCoordinate();
            y = this._getRandomCoordinate();
        }

        return [x, y];
    }

    _getSymbolForPlayer(player) {
        return player === USER_NAME ? USER_MOVE_SYMBOL : COMPUTER_MOVE_SYMBOL;
    }

    _checkCellEqual(symbol) {
        return (i, j) => this._board[i][j] === symbol;
    }
}