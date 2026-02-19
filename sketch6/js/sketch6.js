// playing with notion of "bus" travelling around box and seeing if it will land on "X"; 
// There are 2 methods to affect the bus, mousePressed start and stop and keyrPressed = rapid movement. 
// would like to get the bus to stop moving when the bus reaches the "X". Will continue to work on this. 


function setup() {
    createCanvas(600, 600);
    frameRate(3); //slowed frame rate to allow user to see where the bus is going, and could try to stop it.
    noLoop();
}

function draw() {

    background(0); 

    fill(255);
    rectMode(CENTER);
    rect(300, 300, 100, 100);
    textAlign(CENTER, CENTER);
    textSize(60);
    fill(0);
    text("X", 300, 300);  
    
    let yPos = random(height+10);
    let xPos = random(width+10);

    fill(255, 50, 0);
    rect(xPos, yPos, 75, 25);
    

  if (xPos > width +25) {
    xPos = -25;
  } 

  if (yPos > height + 25) {
    yPos = -25;
  }

}

function mousePressed() {

//thought of putting an OR clause here to capture the position of the bus at the "x" to stop loop. Still exploring P5 reference.
    if (isLooping()) {
    noLoop();
  } else {
    loop();
    x += 50;
    yPos += 50;
  }
}


function keyPressed() {
    redraw();
}

