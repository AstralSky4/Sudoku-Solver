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
        if (keyPressed) {
            board.tileSet.forEach(square => {
                if (square.clicked) {
                    if (keyPressed == -1) square.input(null);
                    else if (board.checkLegalMove(keyPressed, square)) square.input(keyPressed);
                }
            });
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