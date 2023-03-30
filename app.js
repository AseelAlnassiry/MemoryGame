// Identifiers
const startingPage = document.querySelector('.starting-page');
const gamePage = document.querySelector('.game-page');
const startButton = document.querySelector('.starting-page button');

// This function's main purpose is to make the title screen disappear
// The screen should traverse up and become hidden
const dissipateTitle = () => {
  // give the title screen the class of hide
  startingPage.classList.toggle('hide');
  // Hide the title screen and flash in the game screen
  setTimeout(() => (startingPage.style.display = 'none'), 1000);
  setTimeout(() => {
    gamePage.style.display = 'flex';
    gamePage.classList.add('appear');
  }, 1000);
};

// When the start game button is clicked, the game is initialized
// This function should do multiple things:
// 1- Dissipate the title and activate the animation
const initGame = () => {
  dissipateTitle();
};

startButton.addEventListener('click', initGame);
