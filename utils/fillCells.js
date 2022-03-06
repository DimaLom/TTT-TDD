export const fillCells = (game, config = {}) => {
    const {x = -1, y = -1} = config;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i !== x || j !== y) game.acceptUserMove(i, j);
        }
    }
};