function Cell(i, j, cellsize) {
    this.hasBomb = false;
    this.i = i;
    this.j = j;
    this.cellsize = cellsize;
    this.neighborBombs = 0;
    this.revealed = false;
    this.flagged = false;

    this.draw = function () {
        stroke(0);
        if (this.hasBomb) this.neighborBombs = -1;
        if (this.hasBomb && this.revealed) {
            fill(255, 0, 0);
        }
        else if (!this.revealed) fill(93, 0, 255);
        else if (this.revealed && !this.hasBomb) fill(183, 225, 252);
        square(this.j * this.cellsize, this.i * this.cellsize, this.cellsize);
        if (this.hasBomb && this.revealed) {
            // align(CENTER, CENTER);
            image(bombimg, this.j * this.cellsize + this.cellsize / 4, (this.i) * this.cellsize + this.cellsize / 4, this.cellsize / 1.5, this.cellsize / 1.5);
        }
        if (this.flagged) {
            image(flagimg, this.j * (this.cellsize + 0.2), this.i * (this.cellsize + 0.2), this.cellsize / 1.5, this.cellsize / 1.5);

        }
        if (this.revealed && !this.hasBomb) {
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(11);
            text(this.neighborBombs, (this.j + 0.5) * this.cellsize, (this.i + 0.5) * this.cellsize);
        }

    }

    this.reveal = function () {
        if (this.flagged == false) {
            this.revealed = true;
        }
    }

    this.flag = function () {
        if (this.revealed == false) {
            this.flagged = true;
        }
    }
}