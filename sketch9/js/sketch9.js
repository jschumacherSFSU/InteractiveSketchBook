// preload images using array
let images = [];
let currentIndex = 0;

let imgLabel = [
    "Fashionberry",
    "Tastyberry",
    "Dreamyberry",
    "Divaberry",
    "Sleepyberry"
];


let labelIndex = [];

function preload() {

   images[0] = loadImage("../sketch8/img/image1.jpeg");
   images[1] = loadImage("../sketch8/img/image2.jpeg");
   images[2] = loadImage("../sketch8/img/image3.jpeg");
   images[3] = loadImage("../sketch8/img/image4.jpeg");
   images[4] = loadImage("../sketch8/img/image5.jpeg");
}

function setup() {
    createCanvas(images[currentIndex].width, images[currentIndex].height);
    // createCanvas(windowWidth, windowHeight);

    textSize(16);
    let btnL = createButton('<< Back');
        btnL.position(20, 260);
        btnL.style('background-color', 'rgba(220, 220, 220, 0.9)');
    let btnR = createButton('Forward >>');
        btnR.position(images[currentIndex].width - btnR.width+20,260);
        btnR.style('background-color', 'rgba(220, 220, 220, 0.9)');
    btnR.mouseClicked(buttonRight);
    btnL.mouseClicked(buttonLeft);
}


function draw() {
    background(0);
    let img = images[currentIndex];
    image(img, 0, 0);
    textSize(20);
    fill(255);
    text(`Item: ${currentIndex + 1} of ${images.length}`, 10, height - 100);
    text(`Title: ${imgLabel[currentIndex]}` , 10, height - 75);
    text(`Dimensions: ${images[currentIndex].width} x ${images[currentIndex].height}`, 10, height - 50);
    text('Value: Priceless', 10, height - 25);
}

function buttonRight(){
currentIndex++;
    if(currentIndex >= images.length){
        currentIndex = 0;
    }

resizeCanvas(images[currentIndex].width, images[currentIndex].height);
}

function buttonLeft(){
currentIndex--;
if(currentIndex < 0){
    currentIndex = images.length - 1;
}

resizeCanvas(images[currentIndex].width, images[currentIndex].height);
}
