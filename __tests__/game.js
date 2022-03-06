import { Game } from "../src/Game";
import { COMPUTER_MOVE_SYMBOL, USER_MOVE_SYMBOL } from '../constants/moveSymbol';
import { COMPUTER_NAME, USER_NAME } from '../constants/playerName';
import { TAKEN_CELL } from '../constants/texts';
import { expect, jest } from '@jest/globals';
import { getCount } from '../utils/getCount';
import { fillCells } from '../utils/fillCells';
import { GameBuilder } from '../src/GameBuilder';

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

    test('Computer moves in randomly chosen cell', () => {
        const mock = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

        game.createComputerMove();
        const board = game.getState();

        expect(board[1][1]).toEqual(COMPUTER_MOVE_SYMBOL);
        mock.mockRestore();
    });

    test('Throws an exception if user moves in taken cell', () => {
        const x = 2, y = 2;

        game.acceptUserMove(x, y);
        const func = game.acceptUserMove.bind(game, x, y);

        expect(func).toThrow(TAKEN_CELL);
    });

    test('Game saves user\'s move in history', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x, y);
        const history = game.getMoveHistory();

        expect(history).toEqual([{turn: USER_NAME, x, y}]);
    });

    test('Game saves computer\'s move in history', () => {
        const mock = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

        game.createComputerMove();
        const history = game.getMoveHistory();

        expect(history).toEqual([{turn: COMPUTER_NAME, x: 1, y: 1}]);
        mock.mockRestore();
    });

    test('Game saves 1 user\'s move and 1 computer\'s move in history', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x, y);
        game.createComputerMove();
        const history = game.getMoveHistory();

        expect(history.length).toBe(2);
        expect(history[0].turn).toEqual(USER_NAME);
        expect(history[1].turn).toEqual(COMPUTER_NAME);

    });

    test('Computer moves in cell that is not taken', () => {
        fillCells(game, {x: 2, y: 2});

        game.createComputerMove();
        const board = game.getState();

        const userCount = getCount(USER_MOVE_SYMBOL, board);
        const computerCount = getCount(COMPUTER_MOVE_SYMBOL, board);

        expect(userCount).toBe(8);
        expect(computerCount).toBe(1);
        expect(board[2][2]).toEqual(COMPUTER_MOVE_SYMBOL);
    });

    test('If there are no free cells computer throws an exception', () => {
        fillCells(game);

        const func = game.createComputerMove.bind(game);
        expect(func).toThrow('no cells available');
    });

    test('Checks if user won by horizontal', () => {
        const game = new GameBuilder()
            .withBoardState(`
                x x x
                . . .
                . . .`)
            .build();
        const userWon = game.isWinner(USER_NAME);
        expect(userWon).toEqual(true);
    });
});