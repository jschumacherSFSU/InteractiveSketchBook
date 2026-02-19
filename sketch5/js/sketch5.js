// variables to denote step range
let steps = 0;
let maxSteps = 15;

let showText = true;

function setup() {
    createCanvas(1500, 400); 
}

function draw() {

    background(230);


    if(showText){
    textSize(24);
    text("Please complete all steps. Click to begin.", 10, 30);
    }

  

    let sectionWidth = width / maxSteps;

//sections

        noStroke();

        for (let i = 0; i < steps; i++) {
            let w = i * sectionWidth;

            if(i+1 == maxSteps){
                fill('green');
            } else {
                fill((i+1) * 100, (i+1) * 20, (i+1) * 30);
            }
              showText = false;
            stroke(0)
            
            if(i % 2 == 0) {
                circle(w + 40, 200, 75 , 75 );
                noStroke();
                    if(i+1 < steps/2){
                        fill(255);
                    } else {fill(0);}
                textSize(24);
                text((i+1) , w + 25 , 200);
            } else {
                rect(w, 200, 75 , 75);
                noStroke();
                    if(i+1 < steps/2){
                        fill(255);
                    } else {fill(0);}
                textSize(24);
                text((i+1) , w + 30, 230);
            }

            if(steps < maxSteps) {
                textSize(24);
                fill(0);
                text("Step " + (steps) + " done. Click to continue.", width - 400, height - 20);
            } else {

                if(steps >= maxSteps) {
                    textSize(24);
                    fill('green');
                    text("You completed all Steps! Well done.", width - 400, height - 20);
            }
        }
    }
}

function mousePressed() {
    if (steps < maxSteps) {
        steps += 1;
    }
}
