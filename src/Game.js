import { EMPTY_BOARD } from "../constants/emptyBoard";

export class Game {
    constructor() {
        this._board = EMPTY_BOARD
    }

    getState() {
        return this._board
    }

    acceptUserMove(x, y) {
        this._board[0][0] = 'x'
    }
}