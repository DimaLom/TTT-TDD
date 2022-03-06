export const getCount = (symbol, board) =>
    board.reduce((result, row) =>
        row.reduce((count, el) =>
            el === symbol ? ++count : count, result
        ), 0);