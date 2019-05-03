/*
  Game features:
    Player guess number between min-number and max-number
    Player can have a number of tries
    System will notify how any tries the play has left
    System will notify correct answer if all tries used
    System will let user to try again...
*/

// game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3,
  reload = false;

console.log(winningNum);

// ui elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click', () => {

  if (reload) {    // if player wants to play again
    // reload the page to reset the game... easy...
    window.location.reload();
    return;
  }

  let guess = parseInt(guessInput.value);
  //console.log(guess);
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red')
  } else {
    if (guess !== winningNum) {
      guessesLeft--;
      if (guessesLeft == 0) { // if last chance
        updateUI(false, `The correct number is ${winningNum}.  You lose.`, 'red');
      } else {  // still have chances
        updateUI(false, `Wrong Answer.  You have ${guessesLeft} guess(es) left.`, 'red');
        guessInput.value = '';
      }
    } else {
      updateUI(true, `${winningNum} is correct.`, 'green');
    }
  }

})

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function updateUI(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = (won === true || guessesLeft === 0);

  if (guessesLeft === 0 || won === true) {
    guessBtn.value = 'Play Again!';
    reload = true;
  }

  guessInput.style.borderColor = color;
  guessInput.style.color = color;
  setMessage(msg, color);

}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}