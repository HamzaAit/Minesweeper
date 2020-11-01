function Grid(rows, cols, r, cellsize) {
    this.rows = rows;
    this.cols = cols;
    this.cellsize = cellsize;
    this.matrix = [];
    this.gameOver = false;
    this.gameWon = false;
    this.bombs = 0;
    this.cells = this.rows + this.cols;
    this.revealedcells = 0;

    this.generate = function () {
        // make rows
        this.matrix = [];
        //make columns
        for (var i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
        }

        //filling the grid
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                let currentcell = new Cell(i, j, this.cellsize);
                if (random() < r) {
                    currentcell.hasBomb = true;
                    this.bombs += 1;
                }
                else {
                    currentcell.hasBomb = false;
                }
                this.matrix[i][j] = currentcell;
            }
        }

        //Set number of neighboring bombs
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var cell = this.matrix[i][j];
                if (cell.hasBomb) {
                    if (i != 0) {
                        if (j > 0) this.matrix[i - 1][j - 1].neighborBombs += 1;
                        this.matrix[i - 1][j].neighborBombs += 1;
                        if (j < this.cols - 1) this.matrix[i - 1][j + 1].neighborBombs += 1;
                    }
                    if (i != this.rows - 1) {
                        if (j > 0) this.matrix[i + 1][j - 1].neighborBombs += 1;
                        this.matrix[i + 1][j].neighborBombs += 1;
                        if (j < this.cols - 1) this.matrix[i + 1][j + 1].neighborBombs += 1;
                    }
                    if (j > 0) this.matrix[i][j - 1].neighborBombs += 1;
                    if (j < this.cols - 1) this.matrix[i][j + 1].neighborBombs += 1;
                }
            }
        }
    }

    this.draw = function () {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j].draw();
            }
        }
    }

    this.clicked = function () {
        let x = mouseX;
        let y = mouseY;
        x = floor(mouseX / this.cellsize);
        y = floor(mouseY / this.cellsize);
        if (y >= 0 && y < this.rows && x >= 0 && x < this.cols) {
            if (mouseButton == LEFT && !this.matrix[y][x].flagged) {
                this.matrix[y][x].reveal();
                this.revealedcells += 1;
                if (this.matrix[y][x].neighborBombs == 0) {
                    this.recursivereveal(y, x);
                }
                if (this.matrix[y][x].hasBomb == true) {
                    this.gameOver = true;
                    this.revealAllBombs();
                }
            }
            else if (mouseButton == RIGHT){
                this.matrix[y][x].flag();

            }
        }
        if(this.bombs == this.rows * this.cols - this.revealedcells && ! this.gameOver){
            this.gameWon = true;
        }
    }

    this.recursivereveal = function (i, j) {
        for (var x = -1; x <= 1; x++) {
            if (this.matrix[i + x]) {
                for (var y = -1; y <= 1; y++) {
                    if (this.matrix[i + x][j + y] && !this.matrix[i + x][j + y].revealed) {
                        this.matrix[i + x][j + y].reveal();
                        if (this.matrix[i + x][j + y].neighborBombs == 0) {
                            this.recursivereveal(i + x, j + y);
                        }
                    }
                }
            }
        }
    }

    this.revealAllBombs = function () {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                if (this.matrix[i][j].hasBomb)
                    this.matrix[i][j].reveal();
            }
        }
    }

}