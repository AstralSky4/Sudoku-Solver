class AI {

    constructor(board) {
        this.board = board;
        this.possibleNums = new Map();
        this.initState = [];

        for (let i = 0; i < 81; i++) this.possibleNums.set(i, []);
    }

    reset() {
        this.board.tileSet.forEach(square => square.number = null);
    }

    solve() {

        // places all obvious numbers
        this.onlyMoves();

        // keeping track of all currently inputted numbers so that they are not changed by the backtracking algorithm
        this.board.tileSet.forEach(square => {
            if (square.number == null) this.initState.push(square.squareIndex);
        });

        // uses backtracking to recursively solve the rest of the puzzle
        this.recursiveSolve(0);

    }

    onlyMoves() {
        let set = true;
        let setFailCounter = 0;

        while (set) {
            set = false;

            // adds all possible values for each square to a map of arrays
            this.board.tileSet.forEach(square => {
                if (!square.number) {
                    for (let i = 1; i <= 9; i++) {
                        if (this.board.checkLegalMove(i, square)) {
                            this.possibleNums.get(square.squareIndex).push(i);
                        }
                    }
                }
            });

            // checks if any square only has one possible value, and sets it if it does
            this.board.tileSet.forEach(square => {
                if (this.possibleNums.get(square.squareIndex).length == 1) {
                    square.input(this.possibleNums.get(square.squareIndex)[0]);
                    set = true;
                    setFailCounter = 0;
                }
            });

            // checks if for a certain square, any of the other squares in the corresponding row, column and box can't be a certain number. if they can't, set the square to that number
            this.board.tileSet.forEach(square => {
                let row = Math.floor(square.squareIndex / 9);
                let col = square.squareIndex % 9;
                this.possibleNums.get(square.squareIndex).forEach(num => {
                    let found = false;

                    for (let i = row * 9; i < row * 9 + 9; i++) {
                        if (!this.possibleNums.get(i).includes(num)) found = true;
                    }
            
                    for (let i = col; i < col + (9 * 8); i += 9) {
                        if (!this.possibleNums.get(i).includes(num)) found = true;
                    }
            
                    for (let i = 0; i < 9; i++) {
                        if (!this.possibleNums.get(this.board.boxMap.get(square.boxNum)[i].squareIndex).includes(num)) found = true;
                    }

                    if (!found) {
                        square.input(num);
                        set = true;
                        setFailCounter = 0;
                    }
                });
            }); 

            for (let i = 0; i < 81; i++) this.possibleNums.set(i, []);

            if (!set) {
                if (setFailCounter++ != 1) set = true;
            }
        }
    }

    recursiveSolve(index) {
        if (index == this.initState.length) return true;
        for (let i = 1; i <= 9; i++) {
            if (this.board.checkLegalMove(i, this.board.tileSet[this.initState[index]])) {
                this.board.tileSet[this.initState[index]].input(i);
                if (this.recursiveSolve(index + 1)) return true;
            }
        }
        this.board.tileSet[this.initState[index]].number = null;
        return false;
    }
}
