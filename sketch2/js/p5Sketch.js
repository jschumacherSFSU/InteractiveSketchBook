// adjective is frustrating

function setup() {
    createCanvas(600, 400);
 
   
    // if background is set here, it is only done one time
    // this would force the draw() objects to be redrawn every frame
}

function draw() {
    background('green');

    //constraint
    //  creates circle that follows the mouse movement but only within the parameters set in the constraint
    let y = constrain(mouseY, 150, 250);
    stroke('red')
    strokeWeight(4);
    ellipse(100, y, 50, 50);
}

