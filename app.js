// Identifiers
const startingPage = document.querySelector('.starting-page');
const gamePage = document.querySelector('.game-page');
const startButton = document.querySelector('.starting-page button');

// Meme Array
const memePics = [
  'deez.gif',
  'theWok.gif',
  'squid.gif',
  'shovel.gif',
  'speaking.gif',
  'walter.gif',
  'walking.gif',
  'courage.gif',
];

const flipCard = (box) => {
  box.firstChild.classList.toggle('hidden');
  box.lastChild.classList.toggle('hidden');
};

const addListeners = () => {
  // Find the row
  for (let row of gamePage.children) {
    for (let box of row.children) {
      if (!box.classList.contains('middle-tile')) {
        box.addEventListener('click', () => flipCard(box));
      }
    }
  }
};

// Add the back card to every card
// Makes sure that the center piece doesn't get a card back
const addBack = () => {
  // Find the row
  for (let row of gamePage.children) {
    for (let box of row.children) {
      if (!box.classList.contains('middle-tile')) {
        const newImg = document.createElement('img');
        newImg.src = 'mystery.png';
        newImg.alt = 'Card Back';
        newImg.classList.add('card');
        box.appendChild(newImg);
      }
    }
  }
};

const addFront = () => {
  for (let row of gamePage.children) {
    for (let box of row.children) {
      if (!box.classList.contains('middle-tile')) {
        const newImg = document.createElement('img');
        newImg.src = memePics[Math.floor(Math.random() * memePics.length)];
        newImg.alt = 'Card Back';
        newImg.classList.add('card');
        newImg.classList.add('hidden');
        box.appendChild(newImg);
      }
    }
  }
};

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
// 2- Create the backs of the cards
// 3- Assign the front of the cards
const initGame = () => {
  dissipateTitle();
  addBack();
  addFront();
  addListeners();
};

startButton.addEventListener('click', initGame);
