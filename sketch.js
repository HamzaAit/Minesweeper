let grid;
let bombimg;
let flagimg;

document.addEventListener('contextmenu', event => event.preventDefault());

function preload(){
    bombimg = loadImage('./Assets/bomb.png');
    flagimg = loadImage('./Assets/flag.png');
}

function setup() {
    grid = new Grid(28,42,0.12,25);
    grid.generate();
    createCanvas(grid.cols * grid.cellsize, grid.rows * grid.cellsize);
}


function draw() {
    background(0);
    grid.draw();
    if(grid.gameOver){
        background(185,195,201,191);
        fill(0);
        textSize(150);
        text("GAME OVER\n", grid.cols * grid.cellsize / 2, grid.rows * grid.
        cellsize / 2);
        textSize(50);
        text("Press Enter to try again!", grid.cols * grid.cellsize / 2, grid.rows * grid.cellsize / 2);
        noLoop();
    }
    else if(grid.gameWon){
        background(185,195,201,191);
        fill(255,0,0);
        textSize(150);
        text("YOU WIN!\n", grid.cols * grid.cellsize / 2, grid.rows * grid.
        cellsize / 2);
        textSize(50);
        text("Press Enter to play again!", grid.cols * grid.cellsize / 2, grid.rows * grid.cellsize / 2);
        noLoop();
    }
}

function mousePressed(){
    grid.clicked();
}

function keyPressed(){
    if(keyCode === ENTER){
        grid = new Grid(28,42,0.12,25);
        grid.generate();
        loop()
    }
}

