
//adjective is  WORDY
function setup() {
    createCanvas(5000, 800);
    background(255);
    // Set background here to force accumulation of drawn objects
    
}

function draw() {

    // used text properties to create a text object that follows the mouse
    textSize(40);
    stroke('black');
    strokeWeight(4);
    fill('red');
    text('If I said it once, I said it a thousand times...', mouseX, mouseY);
}