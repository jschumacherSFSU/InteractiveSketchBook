let colorProfile = 0;

let r;
let g;
let b;

function setup() {
    createCanvas(400, 400);

    
}

function draw() {
    // insert instructions for color blindness selection. based on selection, set color profile value.


    // these are placeholders for color blindness selections; need to build
    if (colorProfile === 0) {
        r = 255;
        g = 0;
        b = 0;
    } else if (colorProfile === 1) {
        r = 0;
        g = 255;
        b = 0;
    } else if (colorProfile === 2) {
        r = 0;
        g = 0;
        b = 255;
    }
    background(r, g, b);
    
    textAlign(LEFT);
    textSize(16);
    fill(255);
    text("If you have ... Press # ", 20, 50);
}

function keyPressed() {
    if (key === '0') {
        colorProfile = 0;
    } else if (key === '1') {
        colorProfile = 1;
    } else if (key === '2') {
        colorProfile = 2;
    } else if (key === '3') {
        colorProfile = 3;
    }
}
