
//  03032026 - changed course and scrapped the first quiz option after talking to Josh. 
// types of color vision deficiency - text see end of page.

//03042026 - made some good progress on getting the framework set up. have buttons built and have a basic framework in my mind of how this will work. Prelimnary steps will be hard coded, then the user will go through a loop with various options to either stop the app and reset, or move on to the next step. 

// Global variables
let images = [];
let currentIndex = 0;

let textTable;
let baseVisible = false;
let compareVisible = false;
let showRight = false;
let showLeft = false;
let showLong = false;

// text variables
let showMatchText = false;
let showNoMatchText = false;
let offset=0;
let offsetY=0;
let showTitle = true;
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
  // preload image array
   images[0] = loadImage("../MicroIdea_3/img/0baseline.png");
   images[1] = loadImage("../MicroIdea_3/img/1protonopia.png");
   images[2] = loadImage("../MicroIdea_3/img/2deuteranopia.png");
   images[3] = loadImage("../MicroIdea_3/img/3protanomaly.png");
   images[4] = loadImage("../MicroIdea_3/img/4deuteranomaly.png");
   images[5] = loadImage("../MicroIdea_3/img/5tritanopia.png");
   images[6] = loadImage("../MicroIdea_3/img/6tritanomaly.png");
   images[7] = loadImage("../MicroIdea_3/img/7achromatopsia.png");
   images[8] = loadImage("../MicroIdea_3/img/8achromatomaly.png");
  // preload text array
   textTable = loadTable('../MicroIdea_3/data/microIdea3Labels.csv', 'csv', 'header');
}


// 1. click "Let's Check your Color Vision" button
function setup() {
    // use DOM to control div with script 
    const cnv = createCanvas(790, 550); 
    cnv.parent('canvasContainer') ;
  //  set scroll to raise canvas into view
    let container = document.getElementById('canvasContainer');
    container.scrollTop = container.scrollIntoView;

    background(0);

    // set button properties
    btnCYCV = createButton("Let's Begin >>");
    btnCYCV.position (windowWidth/2 - btnCYCV.width - 30 ,windowHeight/2 + 400)
    btnCYCV.size(200,50);
    btnCYCV.style('font-size','24px');
    btnCYCV.style('color', 'black');
    btnCYCV.style('background-color', '0');
    btnCYCV.style('border-radius','10px')
    btnCYCV.mouseClicked(checkVision);
    
    btnStart = createButton("START");
    btnStart.size(125,25)
    btnStart.style('font-size','18px')
    btnStart.position(windowWidth/2 - btnStart.width/2 ,windowHeight/2 + 55);
    btnStart.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnStart.style('border-radius','10px');
    btnStart.hide();
    btnStart.mouseClicked(startToggle);

    btnMatch = createButton("MATCH");
    btnMatch.position(windowWidth/2 - btnStart.width/2 -80,windowHeight/2 + 60);
    btnMatch.size(125,25)
    btnMatch.style('font-size','18px')
    btnMatch.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnMatch.style('border-radius','10px');
    btnMatch.mouseClicked(pressMatch);
    btnMatch.hide();

    btnNoMatch = createButton("NO MATCH");
    btnNoMatch.position(windowWidth/2 - btnStart.width/2+70 ,windowHeight/2 + 60);
    btnNoMatch.size(125,25)
    btnNoMatch.style('font-size','18px')
    btnNoMatch.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnNoMatch.style('border-radius','10px');
    btnNoMatch.mouseClicked(pressNoMatch);
    btnNoMatch.hide();

    btnEnd = createButton("End");
    btnEnd.position(windowWidth/2 - btnStart.width/2 ,windowHeight/2 + 50);
    btnEnd.size(125,25)
    btnEnd.style('font-size','18px')
    btnEnd.style('box-shadow', '10px 10px 10px #9a9a9a')
    btnEnd.style('border-radius','10px');
    btnEnd.mouseClicked(startOver);
    btnEnd.hide();
    imageMode(CENTER);

    scrollToBottom();
}


function draw() {

  if (showTitle){

    textAlign(CENTER, CENTER);
    textSize(60);
    let phrase = "Color Vision Quiz";
    let w = textWidth(phrase);
    let startX = width /2 - w/2;
    let endX = width / 2 + w/2;
    let gradient = drawingContext.createLinearGradient(startX, 0, endX, 0);

    // set color gradient stops
    gradient.addColorStop(0, 'red'); // Start color (red)
    gradient.addColorStop(0.143, 'yellow'); // Middle color (green)
    gradient.addColorStop(0.286, 'pink'); // End color (blue)
    gradient.addColorStop(0.429, 'green'); // End color (blue)
    gradient.addColorStop(0.572, 'purple'); // End color (blue)
    gradient.addColorStop(0.715, 'orange'); // End color (blue)
    gradient.addColorStop(0.858, '#0000ff'); // End color (blue)

    fill(255)
    drawingContext.fillStyle = gradient;   
    text(phrase, width/2 ,height/2 );
    noLoop();
  }
    // create 3 boxes to work with: 1) instructions 2)base image 3)comparison
    // 1
  if(showLong){
    fill(255);
    rect(10,10,770,140);
  }

    // 2
  if(showLeft){
    push();
    translate(offset, offsetY); 
    fill(255);  
    rect(offset+10,offsetY+160, 380, 380);   
    pop();
  }

    // 3
  if (showRight){
    push();
    translate(offset, offsetY); 
    fill(255);
    rect(offset+400,offsetY+160, 380, 380); 
    pop();
  } 
    
  if(showText0){
    textAlign(CENTER,TOP);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text("In this app, you will have an opportunity to see if you have Color Vision Deficiency also known as color blindness. You will also see how people with various types of color vision deficiency see color. ", offset,offsetY+20,770);

    // 2. Show directions text

    let rectX = 10;
    let rectY = 10;
    let rectW = 770;
    let rectH = 140;

    stroke(0);
    noFill();
    rect(rectX, rectY, rectW, rectH);
    let cx = rectX + rectW/2;
    let cy = rectY + rectH/2;

    let part1 = "When you're ready click the ";
    let part2 = "START";
    let part3 = " button.";

    fill(0);
    textSize(16);
    textAlign(CENTER,CENTER);
    let totalWidth = textWidth(part1 + part2 + part3);
    let startX = cx - totalWidth/2;

    textStyle(NORMAL);
    let w1 = textWidth(part1);
    text(part1, startX +w1/2, cy);

    textStyle(BOLD);
    let w2 = textWidth(part2);
    text(part2, startX + w1 + w2/2, cy);

    // Draw Part 3 (Normal)
    textStyle(NORMAL);
    let w3 = textWidth(part3);
    text(part3, startX + w1 + w2 + w3/2, cy);
  }

  if(showText1){
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text("For each test, we'll show you a new image that you can compare to the image in the left box. The first comparison will be for the red-green part of the color spectrum.",offset,offsetY+40,770);
    text("Press the SPACE BAR to see the first comparison.", offset,offsetY+90,770);

    textAlign(CENTER);
    textWrap(WORD);
    fill(0,0,0);
    textSize(24);
    text("This image shows color as people without any deficiency would see it.", offset + width/2 -380, offsetY + 550/2 +200, 360 );
  }
  if(showText2){
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text("Look closely at the two images and compare them. ", offset,offsetY+40,770); 
    text("If you think they are the same, click MATCH otherwise click NO MATCH.", offset,offsetY+60,770)    
  }

  if (baseVisible){
    image(images[0], offset + width/2 -200 , offsetY + 550/2 +50, images[0].width/1.5,images[0].height/1.5);

  }
  if (compareVisible){
    let img = images[currentIndex];
    image(img, offset + width/2 + 380/2, offsetY + 550/2 +50,img.width/1.5, img.height/1.5);
    textAlign(CENTER);
    textSize(18);
    textWrap(WORD);
    textStyle(BOLD);
    fill(0);
    text(`No. ${currentIndex} of ${images.length - 1}`,770/2 +200,height/2 - 100);
  } 

  if(showMatchText && currentIndex >= images.length-1){
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text(`You may have a ${textTable.getString(currentIndex,"Color")} color vision deficiency known as ${textTable.getString(currentIndex,"Caption")}. It is nothing to worry about, but your eye doctor can tell you more about it.`, offset+10,offsetY+40,750);
    text('That was the last comparison. We hope you found this useful. You can press END to close the quiz.',offset,offsetY+80,750);
    
    textAlign(CENTER); 
    textSize(24);  
    fill(0);
    text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360);
  } else if(showMatchText){
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text(`You may have a ${textTable.getString(currentIndex,"Color")} color vision deficiency known as ${textTable.getString(currentIndex,"Caption")}. It is nothing to worry about, but your eye doctor can tell you more about it.`, offset+10,offsetY+40,750);
    text('You can press END to reset the quiz, or press the SPACE BAR to see other comparisons.',offset,offsetY+80,750);
    
    textAlign(CENTER); 
    textSize(24);  
    fill(0);
    text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360);
  }

  if (showNoMatchText && currentIndex >= images.length-1){
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text(`This was a test for ${textTable.getString(currentIndex,"Caption")}, a form of ${textTable.getString(currentIndex,"Color")} color vision deficiency. You don't seem to have it.`,offset,offsetY+40,770);
    text("That was that last comparison. We hope you found this useful.", offset,offsetY+80,770);
    text("Press the SPACE BAR to end the quiz.", offset,offsetY+120,770);

    textAlign(CENTER); 
    textSize(24);
    fill(0);
    text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360 );
  } else  if(showNoMatchText ){
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text(`This was a test for ${textTable.getString(currentIndex,"Caption")}, a form of ${textTable.getString(currentIndex,"Color")} color vision deficiency. You don't seem to have it.`,offset,offsetY+40,770);
    text("Ready for the next comparison?", offset,offsetY+80,770);
    text("Press the SPACE BAR to continue.", offset,offsetY+120,770);

    textAlign(CENTER); 
    textSize(24);
    fill(0);
    text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360 );
  }
}


function checkVision() {
   showText0 = true;
   showRight = true;
   showLeft = true;
   showLong = true;
   showTitle = false;
   btnCYCV.hide();
   btnStart.show();
   loop();
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
    loop();
    showRight = false;
    showLeft = false;
    showLong = false;
    showTitle = true;
    baseVisible = false;
    compareVisible = false;
    showMatchText = false;
    showNoMatchText = false;
    showText0 = false;
    showText1 = false;
    showText2 = false; 

    currentIndex = 0;
    color = textTable.getString(currentIndex,"Color");
    caption = textTable.getString(currentIndex,"Caption");

    btnEnd.hide();
    btnMatch.hide();
    btnNoMatch.hide();  
    btnCYCV.show();

    background(0);
  }

  function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,behavior: 'smooth' 
  });
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