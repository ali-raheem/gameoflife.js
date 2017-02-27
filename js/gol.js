// Under GPLv3 Dr Ali Raheem

function setup (canvasId, boardW = 500, boardH = 250, boardS = 2) {
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    board = [];
    BOARD_H = boardH;
    BOARD_W = boardW;
    BOARD_S = boardS;
    for(i = 0; BOARD_H * BOARD_W > i; ++i)
        board[i] = 0;
    addMess(10, 10);
    addGlider(100, 5);
    canvas.width = BOARD_W * BOARD_S;
    canvas.height = BOARD_H * BOARD_S;
    updateBoard();
}

function setCell (x, y) {
    board[flatten(x, y)] = 1;
}
function clearCell (x, y) {
    board[flatten(x, y)] = 0;
}

function addGlider (x, y) {
    setCell(x, y);
    setCell(x, y+1);
    setCell(x, y+2);
    setCell(x+1, y+2);
    setCell(x+2, y+1);    
}

function addMess (x, y) {
    setCell(x, y);
    setCell(x, y+1);
    setCell(x, y+2);
    setCell(x-1, y+1);
    setCell(x-2, y+2);
}
function updateBoard() {
    drawBoard();
    var boardX = [];
    for (i = 0; BOARD_W > i; ++i) {
        for(j = 0; BOARD_H > j; ++j) {
            boardX[flatten(i, j)] = willLive(i,j);
        }
    }
    for (i = 0; BOARD_W * BOARD_H > i; ++i) {
        board[i] = boardX[i];
    }
    requestAnimationFrame(updateBoard);
}

function drawBoard () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    for (i = 0; BOARD_W > i; ++i) {
        for (j = 0; BOARD_H > j; ++j) {
            if(isAlive(i,j))
                ctx.fillRect(i*BOARD_S, j*BOARD_S, BOARD_S, BOARD_S);
        }
    }
}

function willLive (x, y) {
    switch (sumNeighbours(x, y)) {
    case 2:
        return isAlive(x, y);
    case 3:
        return 1;
    default:
        return 0;
    }
}

function flatten (x, y) {
    return x + y * BOARD_W;
}

function isAlive (x, y) {
    if (0 == x || 0 == y || BOARD_W - 1 <= x || BOARD_H - 1 <= y)
        return 0;
    var i = flatten(x, y);
    return board[i];
}

function sumNeighbours (x, y) {
    var sum = 0;
    sum += isAlive(x-1, y-1);
    sum += isAlive(x-1, y);
    sum += isAlive(x-1, y+1);
    sum += isAlive(x, y-1);
    sum += isAlive(x, y+1);
    sum += isAlive(x+1, y-1);
    sum += isAlive(x+1, y);
    sum += isAlive(x+1, y+1);
    return sum;
}
