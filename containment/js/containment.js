let offset=0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    // MEASURES FROM CENTER OF SHAPE
}

function draw(){
    background(0);

    push();
    translate(offset, offset); 
    // changes, the x,y
    fill(100, 200, 100);
    rect(width/3, height/2, 100, 100);  /*can apply offset to other parameters*/
    pop();
    
    
    rect(width *2/3, height/2, 100, 100);
    
}

function keyPressed(){
offset+= 20;
// or could be random offset += random(-100,100);
// or add constraint offset = contrain(offset, -200,200);

// take current value of offset and each time key is pressed, adds 20 to value, and save to new value
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}