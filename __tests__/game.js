import { EMPTY_BOARD } from "../constants/emptyBoard";
import { Game } from "../src/Game";
import { COMPUTER_MOVE_SYMBOL, USER_MOVE_SYMBOL } from '../constants/moveSymbol';
import { COMPUTER_NAME, USER_NAME } from '../constants/playerName';

let game;

beforeEach(() => {
    game = new Game();
});

describe('Game', () => {
    test('Should return empty game board', () => {
        const board = game.getState();

        expect(board).toEqual(EMPTY_BOARD);
    });

    test('Writes user\'s symbol in cell with given coordinates', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x, y);
        const board = game.getState();

        expect(board[x][y]).toEqual(USER_MOVE_SYMBOL);
    });

    test('Throws an exception if user moves in taken cell', () => {
        const x = 2, y = 2;

        game.acceptUserMove(x, y);
        const func = game.acceptUserMove.bind(game, x, y);

        expect(func).toThrow('cell is already taken');
    });

    test('Computer moves in top left cell', () => {
        game.createComputerMove();
        const board = game.getState();

        expect(board[0][0]).toEqual(COMPUTER_MOVE_SYMBOL);
    });

    test('Game saves user\'s move in history', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x, y);
        const history = game.getMoveHistory();

        expect(history).toEqual([{turn: USER_NAME, x, y}]);
    });

    test('Game saves computer\'s move in history', () => {
        game.createComputerMove();
        const history = game.getMoveHistory();

        expect(history).toEqual([{turn: COMPUTER_NAME, x: 0, y: 0}]);
    });
});