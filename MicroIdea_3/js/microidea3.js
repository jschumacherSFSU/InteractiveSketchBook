
//  03032026 - changed course and scrapped the first quiz option after talking to Josh. 
// types of color vision deficiency - text see end of page.

//03042026 - made some good progress on getting the framework set up. have buttons built and have a basic framework in my mind of how this will work. Prelimnary steps will be hard coded, then the user will go through a loop with various options to either stop the app and reset, or move on to the next step. 

// Global variables
let images = [];
let currentIndex = 1;

let imgLabel = [
    // load from csv file
];

let labelIndex = [];  /* may just need to sync to currentIndex value to keep in sync*/
let baseVisible = false;
let compareVisible = false;

// text variables
let showCaption = false;
let offset=0;
let offsetY=0;
let showText0 = false;
let showText1 = false;

// button variables
let btnCYCV;
let btnStart;
let btnMatch;
let btnNoMatch;

function preload() {

   images[0] = loadImage("../MicroIdea_3/img/0baseline.png");
   images[1] = loadImage("../MicroIdea_3/img/1protonopia.png");
   images[2] = loadImage("../MicroIdea_3/img/2deuteranopia.png");
   images[3] = loadImage("../MicroIdea_3/img/3protanomaly.png");
   images[4] = loadImage("../MicroIdea_3/img/4deuteranomaly.png");
   images[5] = loadImage("../MicroIdea_3/img/5tritanopia.png");
   images[6] = loadImage("../MicroIdea_3/img/6tritanomaly.png");
   images[7] = loadImage("../MicroIdea_3/img/7achromatopsia.png");
   images[8] = loadImage("../MicroIdea_3/img/8achromatomaly.png");
}


// 1. click "Let's Check your Color Vision" button
function setup() {
    createCanvas(1180, 400);  
    background(0);
    btnCYCV = createButton("Let's Check Your Color Vision");
    btnCYCV.position(120,550);
    btnCYCV.size(200,50);
    btnCYCV.style('font-size','20px');
    btnCYCV.style('color', 'white');
    btnCYCV.style('background-color', 'black')
    btnCYCV.mouseClicked(checkVision);
    
    btnStart = createButton("START");
    btnStart.position(175,height+325);
    btnStart.hide();
    btnStart.mouseClicked(startToggle);

    btnMatch = createButton("MATCH");
    btnMatch.position(140, height+350);
    btnMatch.hide();

    btnNoMatch = createButton("NO MATCH");
    btnNoMatch.position(220, height+350);
    btnNoMatch.hide();

    imageMode(CENTER);
}

function draw() {
    // first rectangle background is white with black "border" from background in setup

    let x = 20;
    let y = 20;
    
    // create 3 boxes to work with: 1) instructions 2)base image 3)comparison
    // 1

    fill(255);
    rect(10,10,380,380);

    // 2
    push();
    translate(offset, offsetY); 
    // changes, the x,y
    fill(180);      
    rect(offset+400,offsetY+10, 380, 380);      /*can apply offset to other parameters*/
    pop();

    // 3
    push();
    translate(offset, offsetY); 
    // changes, the x,y
    fill(180);
    rect(offset+790,offsetY+10, 380, 380);      /*can apply offset to other parameters*/
    pop();

    x = constrain(x, 20, 50);
    y = constrain(y, 60, 0);
 
    
    if(showText0){
        textAlign(LEFT);
        textSize(16);
        textWrap(WORD);
        textStyle(NORMAL);
        fill(0);
       
        // 2. Show directions text
        let sent1 = "When you're ready click the ";
        let styledWord = "START ";
        let sent2 = "button.";
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
    }

    if(showText1){
        textAlign(LEFT);
        textSize(16);
        textWrap(WORD);
        textStyle(NORMAL);
        fill(0);

        text("For each test, we'll show you a new image that you can compare to the image in the middle box. The first vision test will be for the red-green part of the color spectrum.",x,y,370);

        text("Press the SPACE BAR to see the first comparison.", x, y + 120, 370);

        textAlign(CENTER);
        text("This image shows color without any deficiency.", offset+ 400 + 380/2 , offsetY + 380-50  );
    }

    if (baseVisible){
        image(images[0], offset + 400 + 380/2 , offsetY + 380/2, images[0].width/1.5,images[0].height/1.5);
    }
    if (compareVisible){
        // use currentIndex and create counter to move through the array. put images in correct order to cycle through
        //  this is hard coded for testing
        image(images[1], offset + 800 + 380/2, offsetY + 380/2,images[1].width/1.5, images[1].height/1.5);
    } 

}


function checkVision() {
   showText0 = true;
   btnCYCV.hide();
   btnStart.show();
}


// 3. Click "Start" > base image (baseline.png) is shown along with text instructions: This image shows the primary range of colors. the first check will be for the red-green part of the color spectrum. Press the space bar to see the first set of colors.
function startToggle(){
btnStart.hide();
baseVisible = true;
showText0 = false;
showText1 = true;
window.focus();
}

// ---------->>>>> START HERE TO FIGURE OUT HOW TO POST NEW TEXT, START WORKING ON THE CSV FILE IDEA, WILL BE THE SMOOTHEST IN THE LONGRUN <<<<<<<<---------
// 4. KeyPressed == "space" - this will begin  to iterate through arrays, swapping comparison images and text from csv file.
function keyPressed() {
  if (key === ' '){
    // work through images array and imageLabel array. use currentIndex as counter to keep track of which image is active.
    compareVisible = true;
     btnMatch.show();
     btnNoMatch.show();
     showText1 = false;
     // Show Text: Look closely at the two images and compare them. If you think they are the same click "MATCH" otherwise click "NO MATCH".
    // if (Match is pressed) {
        // display caption text from array.
        // display text from array: "You may have a form of red/green color deficiency also known as protonopia. Don't worry, there's nothing wrong, but if you're curious call your eye doctor."" 
        // btnMatch.hide();
        // btnNoMatch.hide();
        //  >>>>> consider option to allow user to reset if they matched on the first image or move on to see other images. 
        //  >>>>> something like :"Click "end" to leave the app, or "next" to see the next check. "
    // } else (NO MATCH){
    //  compareVisible = false;
    //  display NOMATCH text from array: Example text: That was a test for Protonopia a form of red/green color deficiency. You don't seem to have it. Ready for the next check? Press the spacebar to proceed.

    // }

  }
  return false;
}
    
//  **************************************************************************   
    // these are placeholders for color blindness selections; need to build real text values in csv
    // ***********************************************************************
//  protonopia - red/green, anomalous red
//  deuteranopia - red/green, anomalous green
// protanomaly - red, orange, and yellow appear green, and the colors are not bright.
// deuteranomaly - Yellow and green appear as red, purple and blue are difficult to identify
//  tritanopia - blue/yellow, anomalous blue
// tritanomaly - blue color appears as green
//  achromatopsia/greyscale - total color blindness - black, white, grey
// achromatomaly
        // possibly use images from https://www.colorblindnesstest.org/color-tools/color-blindness-simulator/ to show variations of color based on deficiency