class Board {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.squareWidth = this.width / 9;
        this.tileSet = [];
        for (let square = 0; square < 81; square++) {
            this.tileSet.push(new Square(square, this.squareWidth));
        }
    }

    draw() {
        
        this.tileSet.forEach(tile => {
            tile.draw();
        });

        ctx.strokeStyle = COLORS.LINE;
        for (let x = 0; x <= this.width; x += this.squareWidth) {

            ctx.lineWidth = (x % (this.squareWidth * 3)) ? "1" : "5";

            ctx.beginPath();

            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);

            ctx.moveTo(0, x);
            ctx.lineTo(this.width, x);

            ctx.stroke();
        }
    }
}
