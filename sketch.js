let grid;
let bombimg;

function preload(){
    bombimg = loadImage('./Assets/bomb.png');
    
}

function setup() {
    grid = new Grid(28,42,0.12,25);
    grid.generate();
    createCanvas(grid.cols * grid.cellsize, grid.rows * grid.cellsize);
}


function draw() {
    background(0);
    grid.draw();
}

function mousePressed(){
    grid.clicked();
}

