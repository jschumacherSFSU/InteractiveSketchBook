let colorProfile=0;
// types of color vision deficiency
//  protonopia - red/green, anomalous red
//  deuteranopia - red/green, anomalous green
//  tritanopia - blue/yellow, anomalous blue
//  achromatopsia/greyscale

let r;
let g;
let b;

function setup() {
    createCanvas(400, 400);
   
    

    

    
}

function draw() {
    // starting background is white with black border
    background(0);
    
    fill(255)
    rect(10,10,380,380)
    // insert instructions for color blindness quiz. based on selection, set color profile value.
        //how to ask questions compared to the color value on screen?

        // possibly use images from https://www.colorblindnesstest.org/color-tools/color-blindness-simulator/ to show variations of color based on deficiency
    
    // these are placeholders for color blindness selections; need to build
    if (colorProfile === 0) {
        r = 128;
        g = 128;
        b = 128;
    } else if (colorProfile === 1) {
        r = 0;
        g = 255;
        b = 0;
    } else if (colorProfile === 2) {
        r = 0;
        g = 0;
        b = 255;
    } else if (colorProfile === 3) {
        r = 255;
        g = 0;
        b = 0;
    }
    fill(r,g,b)
    rect(width/2-25,175, 50,50);

    
    textAlign(LEFT);
    textSize(16);
    fill(0);
   
    text("If you have red/green color sensitivity Press 1 ", 20, 50);
    text("If you have blue/yellow color sensitivity Press 2 ", 20, 70);
    text("If you have no color sensitivity Press 3 ", 20, 90);
    text("Return to neutral Press 0 ", 20, 110);
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
