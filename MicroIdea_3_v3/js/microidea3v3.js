//  03032026 - changed course and scrapped the first quiz option after talking to Josh. 
// types of color vision deficiency - text see end of page.

//03042026 - made some good progress on getting the framework set up. have buttons built and have a basic framework in my mind of how this will work. Prelimnary steps will be hard coded, then the user will go through a loop with various options to either stop the app and reset, or move on to the next step. 


// 03172026 - didn't complete menu suggestion for the final iteration, so adding it in here.
// while researching methods, was reminded of  ARRAY OF OBJECTS [arrObj] - put menu buttons and their functions in the array along side the images so that the buttons are inherently connected to the image, so that when button is pushed, the currentIndex value is automatic. 
// uses concept of levels to move through the index to the desired level and then triggers the function associated with that index.
// build BUTTON GENERATOR to automatically build buttons
// New opening sequence
// >>>>>COMPLETED - NEW VAR in setup() = fromMenu = false;
// From Front screen, btnCYCV button hides front screen and button and shows 8 menu buttons, instructions, and SEPARATE BUTTON to start the quiz from the beginning.
// If a menu button is selected then run from the arrObj. 
// sequence:
// Hide menu buttons + Start bubtton
// Set fromMenu = true + Show 3 boxes + baseline and text + condition image based on button selected + Instructions + Match/No Match button 
// When M/NoM selected, ADD if !fromMenu then normal code, else show condition text, image and caption and new instruction for single menu item explaining condition and show END and MENU buttons, now they can hit end or menu but don't let use go forward > force them back to Menu screen
// If end, hide boxes, hide baseline, text, condition image, instructinos, end/menu buttons; show front screen, title and lets begin button;
// If menu, hide boxes, hide baseline, text, condition image, instructinos, end/menu buttons; show front screen, menu buttons, any necessary text and the quiz button.

// Incorporate feedback to replace spacebar with Next button
// Test on laptop screen to check remarks about position of start and match/no match buttons covering other text. Perhaps increase height of long box so buttons can sit at bottom of box
// Resize image for condition #4 

// Global variables
let images = [];
let arrObj = [];
let cx = 0;
let cy = 0;
let cnv;

let currentIndex = 0;
let canvasPos;
let textTable;
let baseVisible = false;
let compareVisible = false;
let showRight = false;
let showLeft = false;
let showLong = false;
let showMenu = false;
let fromMenu = false;
let hRule;
let vRule;

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
let btnNext;
let btnExam;

function preload() {
  // preload image array
   images[0] = loadImage("../MicroIdea_3_v3/img/0baseline.png");
   images[1] = loadImage("../MicroIdea_3_v3/img/1protonopia.png");
   images[2] = loadImage("../MicroIdea_3_v3/img/2deuteranopia.png");
   images[3] = loadImage("../MicroIdea_3_v3/img/3protanomaly.png");
   images[4] = loadImage("../MicroIdea_3_v3/img/4deuteranomaly.png");
   images[5] = loadImage("../MicroIdea_3_v3/img/5tritanopia.png");
   images[6] = loadImage("../MicroIdea_3_v3/img/6tritanomaly.png");
   images[7] = loadImage("../MicroIdea_3_v3/img/7achromatopsia.png");
   images[8] = loadImage("../MicroIdea_3_v3/img/8achromatomaly.png");


  // preload text array
   textTable = loadTable('../MicroIdea_3_v3/data/microIdea3Labelsv3.csv', 'csv', 'header');
}


// 1. click "Let's Check your Color Vision" button
function setup() {
    // use DOM to control div with script 
    cnv = createCanvas(790, 550); 
    cnv.parent('canvasContainer') ;
        background(0);
    canvasPos = cnv.position();
    cx = canvasPos.x;
    cy = canvasPos.y;
  //  set scroll to raise canvas into view
    let container = document.getElementById('canvasContainer');
    container.scrollTop = container.scrollIntoView;


  //  make adjustment to position using canvas 
    // set button properties
    btnCYCV = createButton("Let's Begin >>");
    btnCYCV.parent('canvasContainer'); // Put it in the same div
    btnCYCV.size(200,50);
    btnCYCV.style('font-size','24px');
    btnCYCV.style('color', 'black');
    btnCYCV.style('background-color', '0');
    btnCYCV.style('border-radius','10px');
    btnCYCV.position (cx + width/2 -100, cy +height - 100);
    btnCYCV.mouseClicked(getMenu);
    
    btnStart = createButton("Start");
    btnStart.parent('canvasContainer'); // Put it in the same div
    btnStart.size(200,50);
    btnStart.style('font-size','24px');
    btnStart.style('border-radius','10px');
    btnStart.position(cx + width/2 - btnStart.width/2 ,cy + 125);
    btnStart.hide();
    btnStart.mouseClicked(startToggle);

    btnMatch = createButton("MATCH");
    btnMatch.parent('canvasContainer'); // Put it in the same div
    btnMatch.size(125,25);
    btnMatch.style('font-size','18px');
    btnMatch.style('box-shadow', '10px 10px 10px #9a9a9a');
    btnMatch.style('border-radius','10px');
    btnMatch.position(cx + width/2 - btnMatch.width -10, cy + height - 450);
    btnMatch.mouseClicked(pressMatch);
    btnMatch.hide();

    btnNoMatch = createButton("NO MATCH");
    btnNoMatch.parent('canvasContainer'); // Put it in the same div
    btnNoMatch.size(125,25);
    btnNoMatch.style('font-size','18px');
    btnNoMatch.style('box-shadow', '10px 10px 10px #9a9a9a');
    btnNoMatch.style('border-radius','10px');
    btnNoMatch.position(cx + width/2 + 10, cy + height - 450);
    btnNoMatch.mouseClicked(pressNoMatch);
    btnNoMatch.hide();

    btnEnd = createButton("End");
    btnEnd.parent('canvasContainer'); // Put it in the same div
    btnEnd.size(125,25);
    btnEnd.style('font-size','18px');
    btnEnd.style('box-shadow', '10px 10px 10px #9a9a9a');
    btnEnd.style('border-radius','10px');
    btnEnd.position(cx + width/2 - btnEnd.width/2 ,cy+110);
    btnEnd.mouseClicked(startOver);
    btnEnd.hide();

    btnNext = createButton("Next");
    btnNext.parent('canvasContainer'); // Put it in the same div
    btnNext.size(125,25);
    btnNext.style('font-size','18px');
    btnNext.style('border-radius','10px');
    btnNext.style('box-shadow', '10px 10px 10px #9a9a9a');
    btnNext.position(cx + width/2 - btnNext.width/2  ,cy + 115);
    btnNext.mouseClicked(goNext);
    btnNext.hide();

    btnExam = createButton("Begin Exam");
    btnExam.parent('canvasContainer'); // Put it in the same div
    btnExam.size(200,50);
    btnExam.style('font-size','24px');
    btnExam.style('border-radius','10px');
    btnExam.position(cx + width/2 - btnExam.width/2 ,cy + height - 70);
    btnExam.mouseClicked(checkVision);
    btnExam.hide();

    
    imageMode(CENTER);

    // force scroll to bottom of window
    scrollToBottom();
// run button creator
    buildMenuButtons();
    
}


function draw() {
  console.log('showTitle:', showTitle, 'showMenu:', showMenu);
    
  // splash screen
  if (showTitle){
    textAlign(CENTER, CENTER);
    textSize(60);
    let phrase = "How's Your Color Vision?";
    let w = textWidth(phrase);
    let startX = width /2 - w/2;
    let endX = width / 2 + w/2;
    let gradient = drawingContext.createLinearGradient(startX, 0, endX, 0);

    // set color gradient stops
    gradient.addColorStop(0, 'red'); // Start color (red)
    gradient.addColorStop(0.143, 'yellow'); // 2nd color (yellow)
    gradient.addColorStop(0.286, 'pink'); // 3rd color (pink)
    gradient.addColorStop(0.429, 'green'); // 4th color (green)
    gradient.addColorStop(0.572, 'purple'); // 5th color (purple)
    gradient.addColorStop(0.715, 'orange'); // 6th color (orange)
    gradient.addColorStop(0.858, '#0000ff'); // 7th color (blue)

    fill(255);
    drawingContext.fillStyle = gradient;   
    text(phrase, width/2 ,height/2 );
    noLoop(); //stop draw
    return;
  } else {
    fill(0);
    rect(0,0,790,550);
  }


  // Menu screen
  // display a title "Vision Menu", 8 buttons (1 per condition), a horizontal line below the 8 buttons, and below the line a single button 
if(showMenu){
    // let box = rect(offset +20,offsetY + 40, 50,750)
    const boxX = offset + 20;
    const boxY = offsetY + 70;
    const boxW = 750;
    const boxH = 50;

    console.log("x: ",cx, "y: ", cy);
    textAlign(CENTER, TOP);
    textSize(40);
    fill (255);
    text("Vision Menu", width/2, 25);
    textStyle(NORMAL);
    textAlign(CENTER);
    textWrap(WORD);
    textSize(20);
    fill(255);
    text("You may look at an individual condition by selecting one of the eight buttons below, or you may run the entire exam from the beginning by selecting the Begin Exam button at the bottom of the screen.", boxX, boxY, boxW);

    // cx - cnv.width/2 + 20, cy + cnv.height/2 - 325, 750
// load buttons

  // draw line
    stroke(255);
    line(50,cy + cnv.height/2+30 , 740, cy + cnv.height/2+30);
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
    text("In this app, you will have an opportunity to see if you have Color Vision Deficiency also known as color blindness. You will also see how people with various types of color vision deficiency see color. ", offset + 20, offsetY+20,770);

    // 2. Show directions text

    let rectX = 10;
    let rectY = 10;
    let rectW = 770;
    let rectH = 140;

    stroke(0);
    noFill();
    rect(rectX, rectY, rectW, rectH);
    let ctrX = rectX + rectW/2;
    let ctrY = rectY + rectH/2;

    let part1 = "When you're ready click the ";
    let part2 = "START";
    let part3 = " button.";

    fill(0);
    textSize(16);
    textAlign(CENTER,CENTER);
    let totalWidth = textWidth(part1 + part2 + part3);
    let startX = ctrX - totalWidth/2;

    textStyle(NORMAL);
    let w1 = textWidth(part1);
    text(part1, startX +w1/2, ctrY);

    textStyle(BOLD);
    let w2 = textWidth(part2);
    text(part2, startX + w1 + w2/2, ctrY);

    // Draw Part 3 (Normal)
    textStyle(NORMAL);
    let w3 = textWidth(part3);
    text(part3, startX + w1 + w2 + w3/2, ctrY);
  }

  if(showText1){
    // directions
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text("For each test, we'll show you a new image that you can compare to the image in the left box. The first comparison will be for the red-green part of the color spectrum.",offset,offsetY+40,770);
    text("Press NEXT to see the first comparison.", offset,offsetY+90,770);

    // left caption
    textAlign(CENTER);
    textWrap(WORD);
    fill(0,0,0);
    textSize(24);
    text("This image shows color as people without any deficiency would see it.", offset + width/2 -380, offsetY + 550/2 +200, 360 );
  }
  if(showText2){
    // direcctions
    textAlign(CENTER);
    textSize(16);
    textWrap(WORD);
    textStyle(NORMAL);
    fill(0);
    text("Look closely at the two images and compare them. ", offset,offsetY+40,770); 
    text("If you think they are the same, click MATCH otherwise click NO MATCH.", offset,offsetY+70,770)    
  }

  if (baseVisible){
    image(images[0], offset + width/2 -200 , offsetY + 550/2 +50, images[0].width/1.5,images[0].height/1.5);

  }
  if (compareVisible){
    let img = images[currentIndex];
    image(img, offset + width/2 + 380/2, offsetY + 550/2 +50,img.width/1.5, img.height/1.5);
    // track movement
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
    } else 
      if(showMatchText && fromMenu){
          console.log('fromMenu =', fromMenu);
          textAlign(CENTER);
          textSize(16);
          textWrap(WORD);
          textStyle(NORMAL);
          fill(0);
          text(`You may have a ${textTable.getString(currentIndex,"Color")} color vision deficiency known as ${textTable.getString(currentIndex,"Caption")}. It is nothing to worry about, but your eye doctor can tell you more about it.`, offset+10,offsetY+30,750);
          text('You can press END to reset the quiz.',offset,offsetY+90,750);
          textSize(24);
          text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360 );
    }else
          if (showMatchText){
              btnEnd.position(cx + width/2 - btnEnd.width *2 ,cy+110);
              btnNext.position(cx + width/2 + btnNext.width ,cy + 110);
              textAlign(CENTER);
              textSize(16);
              textWrap(WORD);
              textStyle(NORMAL);
              fill(0);
              text(`You may have a ${textTable.getString(currentIndex,"Color")} color vision deficiency known as ${textTable.getString(currentIndex,"Caption")}. It is nothing to worry about, but your eye doctor can tell you more about it.`, offset+10,offsetY+40,750);
              text('You can press END to reset the quiz, or press NEXT to see other comparisons.',offset,offsetY+70,750);
              
              textAlign(CENTER); 
              textSize(24);  
              fill(0);
              text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360);
              }
      


  if(showNoMatchText && fromMenu){
        console.log('1fromMenu=',fromMenu, 'showNoMatchText=',showNoMatchText)
        textAlign(CENTER);
        textSize(16);
        textWrap(WORD);
        textStyle(NORMAL);
        fill(0);
        text(`This was a test for ${textTable.getString(currentIndex,"Caption")}, a form of ${textTable.getString(currentIndex,"Color")} color vision deficiency. You don't seem to have it.`,offset + 10,offsetY+20,770);
        text("Press END to return to the Vision Menu.", offset,offsetY+70,770);
        textSize(24);
        text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360 );
        } else if (showNoMatchText && currentIndex >= images.length-1){
                  console.log('2fromMenu=',fromMenu, 'showNoMatchText=',showNoMatchText);
                  textAlign(CENTER);
                  textSize(16);
                  textWrap(WORD);
                  textStyle(NORMAL);
                  fill(0);
                  text(`This was a test for ${textTable.getString(currentIndex,"Caption")}, a form of ${textTable.getString(currentIndex,"Color")} color vision deficiency. You don't seem to have it.`,offset,offsetY+30,770);
                  text("That was the last comparison. We hope you found this useful.", offset,offsetY+60,770);
                  text("Press END to return to the beginning.", offset,offsetY+90,770);
                  textAlign(CENTER); 
                  textSize(24);
                  fill(0);
                  text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360 );
                } else if(showNoMatchText ){
                              console.log('3fromMenu=',fromMenu, 'showNoMatchText=',showNoMatchText)
                              textAlign(CENTER);
                              textSize(16);
                              textWrap(WORD);
                              textStyle(NORMAL);
                              fill(0);
                              text(`This was a test for ${textTable.getString(currentIndex,"Caption")}, a form of ${textTable.getString(currentIndex,"Color")} color vision deficiency. You don't seem to have it.`,offset,offsetY+30,770);
                              text("Ready for the next comparison?", offset,offsetY+60,770);
                              text("Press NEXT to continue.", offset,offsetY+90,770);
                              textAlign(CENTER); 
                              textSize(24);
                              fill(0);
                              text(`${textTable.getString(currentIndex,"Caption")}`, offset + width/2, offsetY + 550/2 +200, 360 );
                              }
      }         

function buildMenuButtons() {
  // set column positions
  const colLeftX  = canvasPos.x + width / 2 - 200;  
  const colRightX = canvasPos.x + width / 2 + 40;   

  const topY = canvasPos.y + 125;     // top margin
  const rowSpacing = 50;

  // set button name, sync with img
  for (let i = 1; i < textTable.getRowCount(); i++) {
    let arrData = {
      title: textTable.getString(i, "Caption"),
      img: images[i],
    };
    arrData.btn = createButton(arrData.title);

    // column and row indices
    let col = (i <=4) ? 0 : 1;       // 0 = left, 1 = right
    let row = (i <=4) ? i : i - 4;   // rows 0..3

    let x = (col === 0) ? colLeftX : colRightX;
    let y = topY + row * rowSpacing;

    // style buttons
    arrData.btn.position(x, y+5);
    arrData.btn.size(150,40);
    arrData.btn.style('font-size', '18px');
    arrData.btn.style('border-radius','10px')
    arrData.btn.hide();
    // button action
    arrData.btn.mouseClicked(() => {
      runMenuItem(i);
    });
    // populate array
    arrObj.push(arrData);
  }
}

// transition from splash screen to menu
function getMenu(){
  console.log('getMenu called');
  showTitle = false;
  console.log('after getMenu, showTitle = ', showTitle);
  btnCYCV.hide();
  showMenu = true;
  for (let item of arrObj) {
      item.btn.show();
    }
  btnExam.show();
    loop();
}

// when a condition menu btn is clicked
function runMenuItem(ind) {
  fromMenu = true;
  showMenu = false;
  currentIndex = ind;

  // Hide menu buttons
  for (let item of arrObj) {
    item.btn.hide();
  }

  // Set up single-condition view
  showTitle = false;
  showLong = true;
  showLeft = true;
  showRight = true;
  baseVisible = true;
  compareVisible = true;

  showText0 = false;
  showText1 = false;
  showText2 = true;   

  showMatchText = false;
  showNoMatchText = false;

  btnMatch.show();
  btnNoMatch.show();
     
  btnNext.hide();
  btnExam.hide();     
  loop();             
}

// full exam function
function checkVision() {
  fromMenu = false;
  showMenu = false;

  for (let item of arrObj) {
    item.btn.hide();
  }

  btnExam.hide();
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
btnNext.show();
window.focus();
}

// 4. KeyPressed == "space" - this will begin  to iterate through arrays, swapping comparison images and text from csv file.
  // if (key === ' '){
    // work through images array and imageLabel array. use currentIndex as counter to keep track of which image is active.
// 3/17/26 - added btnNext - change to button per peer feedback - renamed function to "goNext"
function goNext() {
   
    currentIndex++; //increment index
    if(currentIndex >= images.length){
        currentIndex = 0;
        startOver();
        btnNext.hide();
        return false;
    } 
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
    btnNext.hide();
    return false;
    }
      
  //  if user believes they see matching images
function pressMatch() {
  if(fromMenu){
    btnEnd.show();
    btnMatch.hide();
    btnNoMatch.hide();
    showMatchText = true;
        showText2 = false;
  } else {
    showMatchText = true;
    showText2 = false;
    btnMatch.hide();
    btnNoMatch.hide();
    btnEnd.show();
    btnNext.show();
  }
}
  // if the user does not see matching images
function pressNoMatch(){ 
  console.log('fromMenu=',fromMenu, 'showNoMatch=',showNoMatchText) 
    if(fromMenu) {
      btnEnd.show();
      btnMatch.hide();
      btnNoMatch.hide();
      showNoMatchText = true;
      showText2 = false;
    } else if(currentIndex >= images.length-1){
            btnMatch.hide();
            btnNoMatch.hide();
            btnEnd.show();
            btnNext.hide();
            showNoMatchText = true;
            showText2 = false;
            }else{
                btnMatch.hide();
                btnNoMatch.hide();
                btnNext.show();
                showNoMatchText = true;
                showText2 = false;
              }
}

  function startOver(){
    if (fromMenu) {
    // return to menu
    showRight = false;
    showLeft = false;
    showLong = false;
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

    showTitle = false;
    showMenu = true;
    for (let item of arrObj) item.btn.show();
    btnExam.show();
    btnEnd.hide();
    loop();
  } else {
    // restart 
    loop();
    showRight = false;
    showLeft = false;
    showLong = false;
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
    btnNext.hide();
    fromMenu = false;
    showTitle = true;
    btnCYCV.show();
    background(0);
  }
  }

function positionButtons() {
  const colLeftX  = cx + width / 2 - 200;  
  const colRightX = cx + width / 2 + 40;   

  const topY = cy + 125; 
  const rowSpacing = 50;

  for (let item of arrObj) {
    let i = item.index; 
    // column and row indices
    let col = (i <=4) ? 0 : 1;       // 0 = left, 1 = right
    let row = (i <=4) ? i : i - 4;   // rows 0..3

    let x = (col === 0) ? colLeftX : colRightX;
    let y = topY + row * rowSpacing;
 }

    // menu buttons
  for (let item of arrObj) {
    item.btn.position(x, y+5);
  }
  btnCYCV.position(cx + width/2 - 100, cy + height - 100);
  btnStart.position(cx + width/2 - btnStart.width/2, cy + 125);
  btnMatch.position(cx + width/2 - btnMatch.width - 10, cy + height - 450);
  btnNoMatch.position(cx + width/2 + 10, cy + height - 450);
  btnEnd.position(cx + width/2 - btnEnd.width/2, cy + 110);
  btnNext.position(cx + width/2 - btnNext.width/2, cy + 115);
  btnExam.position(cx + width/2 - btnExam.width/2, cy + height - 70);
}

// reposition buttons when window size changes
function windowResized() {
  cnv = getCanvas(); 
  canvasPos = cnv.position();
  cx = canvasPos.x;
  cy = canvasPos.y;

  positionButtons();
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




