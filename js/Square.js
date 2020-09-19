class Square {
    constructor(i, s) {
        this.squareIndex = i;
        this.number;
        this.size = s;
        this.x = (i % 9) * s;
        this.y = Math.floor(i / 9) * s;
        this.color = COLORS.NORMAL;
        this.clicked = false;
    }

    input(num) {this.number = num;}

    hover() {this.color = this.clicked ? COLORS.CLICKED : COLORS.HOVER;}

    unHover() {this.color = this.clicked ? COLORS.CLICKED : COLORS.NORMAL;}

    click() {
        this.color = COLORS.CLICKED;
        this.clicked = true;
    }

    unClick() {
        this.color = COLORS.NORMAL;
        this.clicked = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);

        if (this.number) {
            ctx.font = `${this.size / 2}px Roboto`;
            ctx.fillStyle = COLORS.TEXT;
            ctx.textAlign = "center";
            ctx.fillText(this.number, this.x + this.size / 2, this.y + this.size / 1.5);
        }
    }
}
