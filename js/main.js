const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

const COLORS = {
    "NORMAL" : "#1e1e1e",
    "HOVER" : "#494949",
    "CLICKED" : "#0d0d0d",
    "LINE" : "#dadada",
    "TEXT" : "white"
}

let board;
let inputHandler;
let solver;

function startGame() {

    board = new Board(c.width, c.height);
    inputHandler = new InputHandler();

    c.addEventListener("click", (e) => {
        let clicked = inputHandler.onHover(e.offsetX, e.offsetY, board.squareWidth);
        board.tileSet[clicked].click();
        board.tileSet.forEach(square => {
            if (square.squareIndex != clicked) square.unClick();
        })
    });

    c.addEventListener("mousemove", (e) => {
        let hovered = inputHandler.onHover(e.offsetX, e.offsetY, board.squareWidth);
        board.tileSet[hovered].hover();
        board.tileSet.forEach(square => {
            if (square.squareIndex != hovered) square.unHover();
        })
    });

    document.addEventListener("keydown", (e) => {
        let keyPressed = inputHandler.keyPress(e.keyCode);
        if (keyPressed > 0) {
            board.tileSet.forEach(square => {
                if (square.clicked && board.checkLegalMove(keyPressed, square)) square.input(keyPressed);
            });
        } else if (keyPressed == -1) {
            board.tileSet.forEach(square => {
                if (square.clicked) square.input(null);
            });
        } else if (keyPressed == -2) {
            let clicked = false;
            for (let i = 0; i < 81; i++) {
                if (board.tileSet[i].clicked) {
                    board.tileSet[i].unClick();
                    board.tileSet[i < 80 ? i + 1 : 0].click();
                    clicked = true;
                    break;
                }
            }
            if (!clicked) board.tileSet[0].click();
        } else if (keyPressed == -3) {
            solver = new AI(board);
            solver.solve();
        } else if (keyPressed == -4) {
            if (solver) solver.reset();
        }
    })

}

function drawLoop() {
    ctx.clearRect(0, 0, board.width, board.height);
    board.draw();

    requestAnimationFrame(drawLoop);
}

startGame();
drawLoop();