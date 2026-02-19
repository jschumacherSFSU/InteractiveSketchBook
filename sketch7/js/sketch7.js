// plan 
// 1. create a player array of 3 players
// 2. create a privileged array of 3 players, with one player being privileged, one player being disadvantaged, and one player being neutral; this will be applied randomly at start of game.
// 3. create a "turns"" variable that determines how many turns available for the game. This will be a random # between 15-25 set globally at start of game.
// 4. ea player will receive coins for each turn random(1-3).  The privilege setting will impact the # of coins received: privileged players will receive 2x coins, disadvantaged players will receive 0.5x coins, and neutral players will receive normal coins (1x).
// capture score for each player for each turn and accumulate.
// 5. in the draw function, create a bar for each player that fills up based on their score per turn. The bars will fill after each turn: privileged player = green; neutral = yellow; disadvantaged = red.
// 6. in the keyPressed function, increase the score of each player based on coins earned for that turn, and update the bars accordingly. The game will end when one player reaches the turns variable value, at which point the winner will be declared with text and the other two players will be tagged with text "Better luck next time."




// 1. Create player array
let players = ["PLAYER 1", "PLAYER 2", "PLAYER 3"];
let playerScores = [0, 0, 0];
let playerLevel = []; // 'privileged', 'neutral', or 'disadvantaged'
let bonus = { privileged: 3, neutral: 2, disadvantaged: 1 };
let colors = { privileged: [0, 255, 0], neutral: [255, 255, 0], disadvantaged: [255, 0, 0] };

  
// 3. Turns variables
let totalTurns;
let thisTurn = 0;
let gameOver = false;
let winner = -1;

function setup() {
  createCanvas(600, 500);
  
  // Set random game length (20-25)
  totalTurns = floor(random(20, 26));


  // 2. Assign level randomly
  let statuses = ['privileged', 'neutral', 'disadvantaged'];
  playerLevel = shuffle(statuses);

  
  textAlign(CENTER);
  textSize(18);
}

function draw() {
  background(50);  
  
  fill(255);
  textAlign(CENTER);
  textSize(24)
  text('Shall we play a game?', width/2 ,25);
  
  text(`Round: ${thisTurn} / ${totalTurns}`, width / 2, 475);

  // 5. Draw bars for each player
  for (let i = 0; i < players.length; i++) {
    let yP = 100 + i * 150;
    
    // Labels
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text(`${players[i]} `, 50, yP - 10);
    text(`Score: ${nf(playerScores[i], 0, 1)}`, 450, yP + 25);

    // Bar background
    fill(0);
    rect(50, yP, 375, 45);

    // Filled bar
    fill(colors[playerLevel[i]]);
   // Mapping 

    let barWidth = map(playerScores[i], 0, 177, 0, 375);


    rect(50, yP, barWidth, 44);

      }

  // 6. Announce Winner
  if (gameOver) {
    fill(255, 200);
    rect(0, 0, width, height);
    fill(0);
    textAlign(CENTER);
    
    
        for (let i = 0; i < players.length; i++) {
            if (i === winner) {
                textSize(60);
                text(`${players[i]} Wins!`, width / 2, height / 2 - 20);
            } else {
                textSize(16);
                text(`${players[i]}: Better luck next time.`, width / 2, height / 2 + 20 + (i * 30));
            }
        }
    }
}

// 6. turns and scoring

function keyPressed() {

  if (thisTurn < totalTurns && !gameOver) {

    thisTurn++;


    for (let i = 0; i < players.length; i++) {

      // 4. Base coins random(1-3)

      let baseCoins = random(1, 3);

      let earned = baseCoins * bonus[playerLevel[i]];

      playerScores[i] += earned;

    }


    if (thisTurn >= totalTurns) {

      gameOver = true;

      // Determine winner (highest score)

      winner = playerScores.indexOf(max(playerScores));

    }

  }

}