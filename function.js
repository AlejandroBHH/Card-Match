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

let showMovements = document.getElementById("movements");

let showHits = document.getElementById("hit");

let showTime = document.getElementById("remainingtime");

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return 0.5 - Math.random;
});

function countTime() {
  rtimerid = setInterval(() => {
    timer--;
    showTime.innerHTML = `Time:${timer} segundos`;
    if (timer == 0) {
      clearInterval(rtimerid);
      lockCards();
      //audio
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
  if ((time = false)) {
    countTime();
    time = true;
  }
  uncoveredCard++;
  if (uncoveredCard == 1) {
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img src="./img/${firstResult}.png">`;
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
      showHits.innerHTML = `Aciertos: ${hits}`;
      if (hits == 8) {
        clearInterval(rtimerid);
        showHits.innerHTML = `Aciertos: ${hits}`;
        showMovements.innerHTML = `Movimientos: ${movements}`;
        showTime.innerHTML = `Fantástico: ${firstimer - timer} segundos`;
      }
    } else {
      setTimeout(() => {
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        uncoveredCard = 0;
      }, 700);
    }
  }
}
