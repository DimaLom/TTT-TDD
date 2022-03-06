import { Game } from "../src/Game";
import { COMPUTER_MOVE_SYMBOL, USER_MOVE_SYMBOL } from '../constants/moveSymbol';
import { COMPUTER_NAME, USER_NAME } from '../constants/playerName';

const initialGameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

describe('Game', () => {
    let game;
    beforeEach(() => {
        game = new Game();
    });


    test('Should return empty game board', () => {
        const board = game.getState();

        expect(board).toEqual(initialGameBoard);
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
        const x = 0, y = 0;

        game.createComputerMove(x, y);
        const board = game.getState();

        expect(board[x][y]).toEqual(COMPUTER_MOVE_SYMBOL);
    });

    test('Game saves user\'s move in history', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x, y);
        const history = game.getMoveHistory();

        expect(history).toEqual([{turn: USER_NAME, x, y}]);
    });

    test('Game saves computer\'s move in history', () => {
        const x = 0, y = 0;

        game.createComputerMove(x, y);
        const history = game.getMoveHistory();

        expect(history).toEqual([{turn: COMPUTER_NAME, x, y}]);
    });

    test('Game saves 1 user\'s move and 1 computer\'s move in history', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x, y);
        game.createComputerMove(0, 0);
        const history = game.getMoveHistory();

        expect(history.length).toBe(2);
        expect(history[0].turn).toEqual(USER_NAME);
        expect(history[1].turn).toEqual(COMPUTER_NAME);

    });
});