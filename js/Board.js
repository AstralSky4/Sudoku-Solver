class Board {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.squareWidth = this.width / 9;
        this.tileSet = [];
        this.boxMap = new Map();

        for (let i = 0; i < 9; i++) this.boxMap.set(i, []);

        for (let square = 0; square < 81; square++) {
            let boxNum = Math.floor((square % 9) / 3) + Math.floor(Math.floor(square / 9) / 3) * 3;
            let newSquare = new Square(square, this.squareWidth, boxNum);

            this.boxMap.get(boxNum).push(newSquare);
            this.tileSet.push(newSquare);
        }
    }

    checkLegalMove(num, tile) {
        let row = Math.floor(tile.squareIndex / 9);
        let col = tile.squareIndex % 9;

        for (let i = row * 9; i < row * 9 + 9; i++) {
            if (this.tileSet[i].number == num) return false;
        }

        for (let i = col; i < col + (9 * 8); i += 9) {
            if (this.tileSet[i].number == num) return false;
        }

        for (let i = 0; i < 9; i++) {
            if (this.boxMap.get(tile.boxNum)[i].number == num) return false;
        }

        return true;
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