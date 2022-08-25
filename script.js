'use strict';

/////////////////////////// DOM ELEMENTS /////////////////////////////

// Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Dice Image
const diceEl = document.querySelector('.dice');

// Players boards
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Current Scores
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');

// Total Scores
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

let score0,
  score1,
  curScore,
  player1Active,
  playing,
  currentScoreDisplay,
  totalScoreDisplay;

/////////////////////////// FUNCTIONS /////////////////////////////

// Starting conditions
function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');

  // Total Score
  score0 = 0;
  score1 = 0;

  // Current Score
  curScore = 0;

  // Active player
  player1Active = true;
  currentScoreDisplay = current0El;
  totalScoreDisplay = score0El;

  playing = true;
}

init();

// Roll random dice
function rollDice() {
  // 1. Generate random dice
  const dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  // 2.Display dice
  diceEl.classList.remove('hidden');
  diceEl.setAttribute('src', `dice-${dice}.png`);

  // 3. Check if rolled 1
  if (dice === 1) {
    // Switch to next player
    curScore = 0;
    playerChange();
  } else {
    // Add dice to current score
    curScore += dice;
  }
  return curScore;
}

// Changing the player
function playerChange() {
  curScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  player1Active = !player1Active;
  if (player1Active) {
    currentScoreDisplay = current0El;
    totalScoreDisplay = score0El;
  } else {
    currentScoreDisplay = current1El;
    totalScoreDisplay = score1El;
  }
}

/////////////////////////// EVENTS /////////////////////////////

// Player rolling
btnRoll.addEventListener('click', function () {
  if (playing) {
    currentScoreDisplay.textContent = rollDice();
  }
});

// Player saving score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    if (player1Active) {
      score0 += curScore;
      totalScoreDisplay.textContent = score0;
    } else {
      score1 += curScore;
      totalScoreDisplay.textContent = score1;
    }

    curScore = 0;
    currentScoreDisplay.textContent = curScore;

    // 2. Check is player's score is >= 100.
    if (score0 >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      player0El.classList.add('player--winner');
      player0El.classList.remove('player--active');
    } else if (score1 >= 20) {
      player1El.classList.add('player--winner');
      player1El.classList.remove('player--active');
    } else {
      // Switch to the next player
      playerChange();
    }
  }
});

btnNew.addEventListener('click', init);
