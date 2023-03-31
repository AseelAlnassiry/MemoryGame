// Identifiers
const startingPage = document.querySelector('.starting-page');
const gamePage = document.querySelector('.game-page');
const startButton = document.querySelector('.starting-page button');

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

// Flip the cards by toggling their classes
const flipCard = (box) => {
  box.firstChild.classList.toggle('hidden');
  box.lastChild.classList.toggle('hidden');
};

// Add the listeners to cards so they can be functional
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

// Assign a front to each card based on the meme array
const assignFront = (box) => {
  rmi = Math.floor(Math.random() * 12);
  console.log(memePics[rmi].name);
  while (memePics[rmi].count === 2) {
    rmi = Math.floor(Math.random() * 12);
  }

  const newImg = document.createElement('img');
  newImg.src = memePics[rmi].name;
  newImg.alt = 'Card Front';
  newImg.classList.add('card')
  newImg.classList.add('hidden')
  box.appendChild(newImg);
  memePics[rmi].count++;
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

// Add the front card to every card
// Makes sure that the center piece doesn't get a front card
// Makes sure each front is only used twice and that its used twice
const addFront = () => {
  let id = 1;
  for (let row of gamePage.children) {
    for (let box of row.children) {
      if (!box.classList.contains('middle-tile')) {
        assignFront(box)
      }
    }
  }
};

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
