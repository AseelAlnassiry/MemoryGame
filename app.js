// Identifiers
const startingPage = document.querySelector('.starting-page');
const gamePage = document.querySelector('.game-page');
const endingPage = document.querySelector('#ending-page');
const startButton = document.querySelector('.starting-page button');
const scoreBox = document.querySelector('.middle-tile');
const startHighScore = document.querySelector('#initial-high-score');
const finalScoreBox = document.querySelector('#final-score');
const finalHighScore = document.querySelector('#final-high-score');
const restartButton = document.querySelector('#restart-button');
let disableClicks = false;
let firstCard = null;
let secondCard = null;
let cardsFlipped = 0;
let score = 0;

// High score from storage
let highScore = localStorage.getItem('highScore');
if (highScore) {
  startHighScore.innerText = highScore;
}

// Meme Array
const memePics = [
  { name: 'deez.gif', count: 0 },
  { name: 'dance.gif', count: 0 },
  { name: 'chad.gif', count: 0 },
  { name: 'courage.gif', count: 0 },
  { name: 'knife.gif', count: 0 },
  { name: 'shovel.gif', count: 0 },
  { name: 'speaking.gif', count: 0 },
  { name: 'squid.gif', count: 0 },
  { name: 'theWok.gif', count: 0 },
  { name: 'drunk.gif', count: 0 },
  { name: 'walking.gif', count: 0 },
  { name: 'walter.gif', count: 0 },
];

// Make the title screen disappear
const dissipateTitle = () => {
  // give the title screen the class of hide
  startingPage.classList.toggle('hide');
  // Hide the title screen and flash in the game screen
  setTimeout(() => (startingPage.style.display = 'none'), 1000);
  setTimeout(() => {
    gamePage.style.display = 'flex';
    gamePage.classList.add('appear');
  }, 1000);
  setTimeout(() => {
    gamePage.classList.remove('appear');
  }, 2000);
};

// Add the back card to every card
// Makes sure that the center piece doesn't get a back card
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

// Assign a front to each card based on the meme array
// Makes sure each front is only used twice and that its used twice
const assignFront = (box) => {
  rmi = Math.floor(Math.random() * 12);
  while (memePics[rmi].count === 2) {
    rmi = Math.floor(Math.random() * 12);
  }
  const newImg = document.createElement('img');
  newImg.src = memePics[rmi].name;
  newImg.alt = 'Card Front';
  newImg.classList.add('card');
  newImg.classList.add('hidden');
  box.appendChild(newImg);
  memePics[rmi].count++;
};

// Add the front card to every card
// Makes sure that the center piece doesn't get a front card
const addFront = () => {
  let id = 1;
  for (let row of gamePage.children) {
    for (let box of row.children) {
      if (!box.classList.contains('middle-tile')) {
        assignFront(box);
      }
    }
  }
};

// Flip the cards by toggling their classes
const flipCard = (box) => {
  box.firstChild.classList.toggle('hidden');
  box.lastChild.classList.toggle('hidden');
};

// Does the inital reveal for each card
// Allows for the cards to be seen for 5 seconds before the game begins
const firstReveal = () => {
  console.log('i ran?');
  for (let row of gamePage.children) {
    for (let box of row.children) {
      if (!box.classList.contains('middle-tile')) {
        setTimeout(() => flipCard(box), 3000);
        setTimeout(() => flipCard(box), 6000);
      }
    }
  }
};

// Updates the current score and adds it to the score box
const updateScore = () => {
  let currentScore = scoreBox.innerText;
  const newScore = Number(currentScore) + 1;
  score++;
  scoreBox.innerText = newScore;
};

// Takes player to end screen
const finishGame = () => {
  // give the title screen the class of hide
  gamePage.classList.toggle('hide');
  // Hide the title screen and flash in the game screen
  setTimeout(() => (gamePage.style.display = 'none'), 1000);
  setTimeout(() => {
    endingPage.style.display = 'flex';
    endingPage.classList.add('appear');
  }, 1000);
  setTimeout(() => {
    endingPage.classList.remove('appear');
  }, 2000);
  finalScoreBox.innerText = score;
  if (highScore) {
    highScore = score < highScore ? score : highScore;
  } else {
    highScore = score;
  }
  localStorage.setItem('highScore', highScore);
  finalHighScore.innerText = highScore;
};

// Main game function
// This function should do multiple things:
// 1- Check if a card is already flipped or no clicks are allowed
// 2- Assign a first card or a second card if already a first
// 3- Check card matching if there's already two cards
// 4- Handle score upkeep
// 5- Check if the game is over
const handleCardClick = (box) => {
  if (disableClicks) return;
  if (!box.lastChild.classList.contains('hidden')) return;
  const currentCard = box;
  if (!firstCard || !secondCard) {
    flipCard(box);
    firstCard = firstCard || currentCard;
    secondCard = currentCard === firstCard ? null : currentCard;
  }
  if (firstCard && secondCard) {
    disableClicks = true;
    if (firstCard.lastChild.src === secondCard.lastChild.src) {
      cardsFlipped += 2;
      firstCard = null;
      secondCard = null;
      disableClicks = false;
      if (cardsFlipped === 24) {
        finishGame();
      }
    } else {
      setTimeout(() => {
        flipCard(firstCard);
        flipCard(secondCard);
        firstCard = null;
        secondCard = null;
        updateScore();
        disableClicks = false;
      }, 1000);
    }
  }
};

// Adds a click listener to all the boxes except the score box
const addListeners = () => {
  for (let row of gamePage.children) {
    for (let box of row.children) {
      if (!box.classList.contains('middle-tile')) {
        box.addEventListener('click', () => {
          handleCardClick(box);
        });
      }
    }
  }
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
  firstReveal();
  setInterval(() => addListeners(), 6000);
};

// The event that restarts the game
restartButton.addEventListener('click', () => window.location.reload());

// The event that starts the game when the start game button is pressed
startButton.addEventListener('click', initGame);
