let grid;
let bombimg;
let flagimg;

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
        text("GAME OVER", grid.cols * grid.cellsize / 2, grid.rows * grid.cellsize / 2);
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

