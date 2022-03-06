import { EMPTY_BOARD } from "../constants/emptyBoard";
import { Game } from "../src/Game";

let game

beforeEach(() => {
    game = new Game()
})

describe('Game', () => {
    test('Should return empty game board', () => {
        const board = game.getState()

        expect(board).toEqual(EMPTY_BOARD)
    })

    test('Writes user\'s symbols in top left cell', () => {
        const x = 0, y = 0

        game.acceptUserMove(x, y)
        const board = game.getState()

        expect(board[x][y].toEqual('x'))
    })
})