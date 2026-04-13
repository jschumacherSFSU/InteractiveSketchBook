// 02242026 - built out containment with keypress
// 02262026 - adding time as a factor

let offset=0;
let offsetY=0;
let startTime;
let timeLimit = 10000;   //milisecs
let timerStarted = false;
let level = 1;

function setup(){
    createCanvas(windowWidth, 800);
    rectMode(CENTER);     // MEASURES FROM CENTER OF SHAPE
}

function draw(){
    background(0);

    if (level === 1){
        timeLimit = 10000;
    }
    if (level ===2){
        timeLimit === 5000;
    }

    if (timerStarted) {
    let elapsed = millis() - startTime;
    let remaining =  floor((timeLimit - elapsed)/1000);
    timerStarted = true;
    textSize(32);
    fill(255);
    text("Time: " + remaining , width/2, 50);
    
    if(elapsed>timeLimit){
        offset=0;
        offsetY=-0;
        startTime = millis();
    }
        
        
    if(remaining <= 0) {
    remaining = 0;
    timerStarted = false;
    }

   

    
        
    

    push();
    translate(offset, offsetY); 
    // changes, the x,y
    fill(100, 200, 100);
    rect(width *2/3, height/2, 100, 100);      /*can apply offset to other parameters*/
    pop();
    
    // static rect
    rect(width/3, height/2, 100, 100); 
}
}
        
function keyPressed(){ 
    if(!timerStarted){
    timerStarted = true;
    offset += random(-50, 50);
    offsetY += random(-75, 75);
     } else {
    if(elapsed>timeLimit){
        offset=0;
        offsetY=-0;
        startTime = millis();
        }
    }
}
    
    

// offset+= 20;

// or could be random offset += random(-100,100);
// or add constraint offset = contrain(offset, -200,200);

// take current value of offset and each time key is pressed, adds 20 to value, and save to new value

function windowResized(){
    resizeCanvas(windowWidth, 800);
}
