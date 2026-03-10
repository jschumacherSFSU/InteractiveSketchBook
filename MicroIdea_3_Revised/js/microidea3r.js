
//  03032026 - changed course and scrapped the first quiz option after talking to Josh. 
// types of color vision deficiency - text see end of page.

//03042026 - made some good progress on getting the framework set up. have buttons built and have a basic framework in my mind of how this will work. Prelimnary steps will be hard coded, then the user will go through a loop with various options to either stop the app and reset, or move on to the next step. 

// Global variables
let images = [];
let currentIndex = 0;

let textTable;
let baseVisible = false;
let compareVisible = false;
let show

// text variables
let showMatchText = false;
let showNoMatchText = false;
let offset=0;
let offsetY=0;
let showText0 = false;
let showText1 = false;
let showText2 = false;

// button variables
let btnCYCV;
let btnStart;
let btnMatch;
let btnNoMatch;
let btnEnd;

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

   textTable = loadTable('../MicroIdea_3/data/microIdea3Labels.csv', 'csv', 'header');
}


// 1. click "Let's Check your Color Vision" button
function setup() {
    const cnv = createCanvas(1180, 400); 
    cnv.parent('canvasContainer') ;
    background(0);
    btnCYCV = createButton("Let's Check Your Color Vision");
    btnCYCV.position (width/2,height/2)
    // btnCYCV.position(400 + (380/2)-btnCYCV.width/2,600);
    btnCYCV.size(250,100);
    btnCYCV.style('font-size','28px');
    btnCYCV.style('color', '#333333');
    btnCYCV.style('background-color', '#e76ef59a');
    btnCYCV.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnCYCV.style('border-radius','10px')
    btnCYCV.mouseClicked(checkVision);
    
    btnStart = createButton("START");
    btnStart.size(125,25)
    btnStart.style('font-size','18px')
    btnStart.position(380/2 - btnStart.width/2,height+325);
    btnStart.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnStart.style('border-radius','10px');
    btnStart.hide();
    btnStart.mouseClicked(startToggle);

    btnMatch = createButton("MATCH");
    btnMatch.position(80, height+350);
    btnMatch.size(125,25)
    btnMatch.style('font-size','18px')
    btnMatch.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnMatch.style('border-radius','10px');
    btnMatch.mouseClicked(pressMatch);
    btnMatch.hide();

    btnNoMatch = createButton("NO MATCH");
    btnNoMatch.position(220, height+350);
    btnNoMatch.size(125,25)
    btnNoMatch.style('font-size','18px')
    btnNoMatch.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnNoMatch.style('border-radius','10px');
    btnNoMatch.mouseClicked(pressNoMatch);
    btnNoMatch.hide();

    btnEnd = createButton("End");
    btnEnd.position(400/2 - btnEnd.width,height+325);
    btnEnd.size(125,25)
    btnEnd.style('font-size','18px')
    btnEnd.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnEnd.style('border-radius','10px');
    btnEnd.mouseClicked(startOver);
    btnEnd.hide();


    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(255,0,0);
    text(`${currentIndex}`,25,25);

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
    fill(255);      
    rect(offset+400,offsetY+10, 380, 380);      /*can apply offset to other parameters*/
    pop();

    // 3
    push();
    translate(offset, offsetY); 
    // changes, the x,y
    fill(255);
    rect(offset+790,offsetY+10, 380, 380);      /*can apply offset to other parameters*/
    pop();

    x = constrain(x, 20, 50);
    y = constrain(y, 60, 0);
 
    
    if(showText0){
        textAlign(CENTER,TOP);
        textSize(16);
        textWrap(WORD);
        textStyle(NORMAL);
        fill(0);
        text("In this app, you will have an opportunity to see if you have Color Vision Deficiency also known as color blindness. You will also see how people with various types of color vision deficiency see color. ", x,y,370);

        // 2. Show directions text
        let sent1 = "When you're ready click the ";
        let styledWord = "START ";
        let sent2 = "button.";
        let w1 = textWidth(sent1)+10;

        textAlign(LEFT);
        text(sent1, x+10, y+120);

        textStyle(BOLD);
        text(styledWord, x + w1,y+120,370);

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
        text("For each test, we'll show you a new image that you can compare to the image in the middle box. The first comparison will be for the red-green part of the color spectrum.",x,y+50,370);
        text("Press the SPACE BAR to see the first comparison.", x, y + 150, 370);

        textAlign(CENTER);
        textWrap(WORD);
        text("This image shows color as people without any deficiency would see it.", 410, offsetY + 380-50, 360 );
        fill(255,0,0);
        textSize(24);

    }
    if(showText2){
        textAlign(CENTER);
        textSize(16);
        textWrap(WORD);
        textStyle(NORMAL);
        fill(0);
        text("Look closely at the two images and compare them. If you think they are the same, click MATCH otherwise click NO MATCH.", x, y +90, 370);

        
    }
    if (baseVisible){
        image(images[0], offset + 400 + 380/2 , offsetY + 380/2, images[0].width/1.5,images[0].height/1.5);

    }
    if (compareVisible){
        let img = images[currentIndex];

        image(img, offset + 780 + 380/2, offsetY + 380/2,img.width/1.5, img.height/1.5);
        textAlign(CENTER);
        textSize(18);
        textWrap(WORD);
        textStyle(BOLD);
        fill(0);
        text(`No. ${currentIndex} of ${images.length - 1}`,380/2,25);
    } 


    if(showMatchText){
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text(`You may have a ${textTable.getString(currentIndex,"Color")} color vision deficiency known as ${textTable.getString(currentIndex,"Caption")}. It is nothing to worry about, but your eye doctor can tell you more about it.`, x,y +55,370);
    text('You can press END to reset to the beginning, or press the SPACE BAR to see other comparisons.',x, y + 160, 370);
    
    textAlign(CENTER); 
    textSize(20);  
    fill(0);
    text(`${textTable.getString(currentIndex,"Caption")}`, offset+ 780 + 380/2 , offsetY + 380-50 );
    }

    if(showNoMatchText){
        textAlign(CENTER);
        textSize(16);
        textWrap(WORD);
        textStyle(NORMAL);
        fill(0);
        text(`This was a test for ${textTable.getString(currentIndex,"Caption")}, a form of ${textTable.getString(currentIndex,"Color")} color vision deficiency. You don't seem to have it.`,x,y +55,370);
        text("Ready for the next comparison?", x, y + 150, 370);
        text("Press the SPACE BAR to move on.", x, y + 175, 370);

        textAlign(CENTER); 
          textSize(20);
        text(`${textTable.getString(currentIndex,"Caption")}`, offset+ 780 + 380/2 , offsetY + 380-50 );
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


// 4. KeyPressed == "space" - this will begin  to iterate through arrays, swapping comparison images and text from csv file.
function keyPressed() {
  if (key === ' '){
    // work through images array and imageLabel array. use currentIndex as counter to keep track of which image is active.
    if(currentIndex <= images.length)
    currentIndex++;
    if(currentIndex >= images.length){
        currentIndex = 0;
        startOver();
    } else {
    color = textTable.getString(currentIndex,"Color");
    caption = textTable.getString(currentIndex,"Caption");

    compareVisible = true;
    btnMatch.show();
    btnNoMatch.show();
    showText1 = false;
    showText2 = true;
    showMatchText = false;
    showNoMatchText = false;
    btnEnd.hide();
    }
  }

  
  return false;
}

function pressMatch() {

    showMatchText = true;
    showText2 = false;
    btnMatch.hide();
    btnNoMatch.hide();
    btnEnd.show();
  }

  function pressNoMatch(){
    
    btnMatch.hide();
    btnNoMatch.hide();
    showNoMatchText = true;
    showText2 = false;

  }

  function startOver(){
    baseVisible = false;
    compareVisible = false;
    showMatchText = false;
    showNoMatchText = false;

    color = textTable.getString(currentIndex,"Color");
    caption = textTable.getString(currentIndex,"Caption");

    btnEnd.hide();
    btnCYCV.show();
    currentIndex = 0;
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