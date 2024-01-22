let uncoveredCard = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let time = false;
let timer = 50;
let firstimer = 50;
let rtimerid = null;

let winAudio = new Audio("./sounds/win.wav");
let loseAudio = new Audio("./sounds/lose.wav");
let clickAudio = new Audio("./sounds/click.wav");
let rightAudio = new Audio("./sounds/right.wav");
let wrongAudio = new Audio("./sounds/wrong.wav");

let showMovements = document.getElementById("movements");

let showHits = document.getElementById("hit");

let showTime = document.getElementById("remainingtime");

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
for (let i = numbers.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
}

function countTime() {
  rtimerid = setInterval(() => {
    timer--;
    showTime.innerHTML = `Time:${timer} segundos`;
    if (timer == 0) {
      clearInterval(rtimerid);
      lockCards();
      //audio
      loseAudio.play();
    }
  }, 1000);
}

function lockCards() {
  for (let i = 0; i <= 15; i++) {
    let lockedCard = document.getElementById(i);
    lockedCard.innerHTML = `<img src="./img/${i}.png">`;
    lockedCard.disabled = true;
  }
}

//main function

function turn(id) {
  if (time == false) {
    countTime();
    time = true;
  }
  uncoveredCard++;
  if (uncoveredCard == 1) {
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img src="./img/${firstResult}.png">`;
    clickAudio.play();
    card1.disabled = true;
  } else if (uncoveredCard == 2) {
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = `<img src="./img/${secondResult}.png">`;
    card2.disabled = true;
    movements++;
    showMovements.innerHTML = `Movimientos: ${movements}`;

    if (firstResult == secondResult) {
      uncoveredCard = 0;
      hits++;
      rightAudio.play();
      showHits.innerHTML = `Aciertos: ${hits}`;
      if (hits == 8) {
        clearInterval(rtimerid);
        showHits.innerHTML = `Aciertos: ${hits}`;
        showMovements.innerHTML = `Movimientos: ${movements}`;
        showTime.innerHTML = `Fantástico: ${firstimer - timer} segundos`;
        winAudio.play();
      }
    } else {
      setTimeout(() => {
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        uncoveredCard = 0;
        wrongAudio.play();
      }, 700);
    }
  }
}
