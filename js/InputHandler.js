class InputHandler {

    keyPress(e) {
        if (e >= 48 && e <= 57) {
            return e - 48;
        }
        if (e >= 96 && e <= 105) {
            return e - 96;
        }
        if (e == 8) {
            return -1;
        }
        if (e == 13) {
            return -2;
        }
        if (e == 32) {
            return -3;
        }
        if (e == 27) {
            return -4;
        }
    }

    onHover(x, y, size) {
        let xTile = Math.ceil(x / size);
        let yTile = Math.ceil(y / size);
        let squareNum = (yTile - 1) * 9 + xTile;

        return squareNum - 1;
    }

}