
//  03032026 - changed course and scrapped the first quiz option after talking to Josh. 
// types of color vision deficiency

//  protonopia - red/green, anomalous red
//  deuteranopia - red/green, anomalous green
// protanomaly - red, orange, and yellow appear green, and the colors are not bright.
// deuteranomaly - Yellow and green appear as red, purple and blue are difficult to identify
//  tritanopia - blue/yellow, anomalous blue
// tritanomaly - blue color appears as green
//  achromatopsia/greyscale - total color blindness - black, white, grey
// achromatomaly
        // possibly use images from https://www.colorblindnesstest.org/color-tools/color-blindness-simulator/ to show variations of color based on deficiency

// Global variables
let images = [];
let currentIndex = 1;

let imgLabel = [
    // load from csv, find table loading code from previous lesson.
];


let labelIndex = [];
let baseVisible = false;
let compareVisible = false;
function preload() {

   images[0] = loadImage("/MicroIdea_3/img/0baseline.png");
   images[1] = loadImage("/MicroIdea_3/img/1protonopia.png");
   images[2] = loadImage("/MicroIdea_3/img/2deuteranopia.png");
   images[3] = loadImage("/MicroIdea_3/img/3protanomaly.png");
   images[4] = loadImage("/MicroIdea_3/img/4deuteranomaly.png");
   images[5] = loadImage("/MicroIdea_3/img/5tritanopia.png");
   images[6] = loadImage("/MicroIdea_3/img/6tritanomaly.png");
   images[7] = loadImage("/MicroIdea_3/img/7achromatopsia.png");
   images[8] = loadImage("/MicroIdea_3/img/8achromatomaly.png");
}


let offset=0;
let offsetY=0;
let showText = false;
let btnCYCV;
let btnStart;

   // 1. click "Check your Color Vision" button
function setup() {
    createCanvas(1180, 400);  
    background(0);
    btnCYCV = createButton("Let's Check Your Color Vision");
    btnCYCV.position(130,650);
    btnCYCV.size(200,50);
    btnCYCV.style('font-size','20px');
    btnCYCV.style('color', 'white');
    btnCYCV.style('background-color', 'black')
    btnCYCV.mouseClicked(checkVision);
    
    btnStart = createButton("START");
    btnStart.position(175,height+350);
    btnStart.hide();
    btnStart.mouseClicked(startToggle);
    
}





function draw() {
    // starting background is white with black border

    let x = 20;
    let y = 20;
    // background(0);
    
    // create 3 boxes to work with: 1) instructions 2)base image 3)comparison
    // 1
    push();
    translate(offset, offsetY); 
    // changes, the x,y
    fill(180);      
    rect(offset+400,offsetY+10, 380, 380);      /*can apply offset to other parameters*/
    pop();

    // 2
    push();
    translate(offset, offsetY); 
    // changes, the x,y
    fill(180);
    rect(offset+790,offsetY+10, 380, 380);      /*can apply offset to other parameters*/
    pop();

    // 3
    fill(255)
    rect(10,10,380,380)
    
    x = constrain(x, 20, 50);
    y = constrain(y, 60, 0);

    
    if(showText){
    textAlign(LEFT);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL)
    fill(0);
    // 2. Show text: In this app, you will have an opportunity to see if you have color blindness, but also to see how people with various types of color deficiency see color. When you're ready click the "Start" button.
    let sent1 = "When you're ready click the ";
    let styledWord = "START ";
    let sent2 = "button."
    let w1 = textWidth(sent1);

    text("In this app, you will have an opportunity to see if you have Color Vision Deficiency also known as color blindness. You will also see how people with various types of color vision deficiency see color. ", x,y,370);

    text(sent1, x, y+120);

    fill(0);
    textStyle(BOLD);

    text(styledWord, x + w1,y+108,370);

    let w2 = textWidth(styledWord);
    fill(0);
    textStyle(NORMAL);
    text(sent2, x + w1 + w2, y+120); 
    

    // ------------>>>>>>>>>>>>figure out how to center image in middle rectangle using imageMode and rectMode<<<<<<<<<<<<<<-----------------
    if (baseVisible){
        image(images[0], offset , offsetY ,images[0].width/1.5,images[0].height/1.5);
    }
    if (compareVisible){
        // user currentIndex and create counter to move through the array. put images in correct order to cycle through
    } 

}
}


function checkVision() {
   showText = true;
   btnCYCV.hide();
   btnStart.show();
}

function startToggle(){
btnStart.hide();
baseVisible = true;
showText = false;
}

// ---------->>>>> START HERE TO FIGURE OUT HOW TO POST NEW TEXT, START WORKING ON THE CSV FILE IDEA, WILL BE THE SMOOTHEST IN THE LONGRUN
// 3. Click "Start" > base image (baseline.png) is shown along with text instructions: This image shows the primary range of colors. the first check will be for the red-green part of the color spectrum. Press the space bar to see the first set of colors.






// function keyPressed() {
// //   if keyPressed == (SPACE)?
// }



    // 4. KeyPressed == "space"?? image: protonopia.png
    // 5. Text: Look closely at the two images and compare them. If you think they are the same click "MATCH" otherwise click "NO MATCH"
    //  if (Match is pressed) > hide protonopia.png && display text: You may have a form of red/green color deficiency also known as protonopia. Don't worry, there's nothing wrong, but you can see an eye doctor to confirm. Click "end" to leave the app, or "next" to see the next check. 
    //  else > hide protonopia.png && Display text: That was a test for Protonopia a form of red/green color deficiency. You don't seem to have it. Ready for the next check? Press the spacebar to proceed.
    //  [now we are in a loop of match/no match options. think about building arrays of the names, associated text values and images. Cycle through]


    
    // these are placeholders for color blindness selections; need to build
    