
// adjective is slow
function setup() {
    createCanvas(1000, 400);
}

function draw() {
    background(240);

    // direct manipulation
    //  creates a square that follows the mouse movement but is restricted to a slower frame rate.
    frameRate(2);
    stroke(0);
    strokeWeight(15);
    fill('red');
    rect(mouseX, mouseY, 60, 60);
}
