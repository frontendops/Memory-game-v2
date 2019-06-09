import cards from "./cards.js";
let openCards = [];
let matchAttempts = 0;
let matchedCards = [];
let shuffledCards = shuffle(cards);
let second = -1;
let time;
let timer = document.querySelector(".timer");
let moves = document.querySelector(".moves");
let currentMoves = 0;
const modulContainer = document.querySelector(".modulContainer");
document.querySelector(".restart").addEventListener("click", restartGame);
document.querySelector(".button").addEventListener("click", restartGame);
let stars = document.querySelector(".stars");

const deck = document.querySelector(".deck");

//rendering the cards and starting time
let renderCards = function() {
  cards.map(card => {
    let el = document.createElement("li");
    el.classList.add("card");
    el.innerHTML = `<i class="fa fa-${card}"></i>`;
    deck.appendChild(el);
    el.addEventListener("click", openCard);
  });
  shuffle(cards);
};

// what happens each time a card is clicked
function openCard(e) {
  let card = e.target;
  card.classList.add("show", "open");
  if (openCards.length === 1) {
    const thisCard = card;
    const lastCard = openCards[0];

    openCards.push(card);
    matchAttempts++;
    compareCards(thisCard, lastCard);
    matchAttempts === 1 ? startTimer() : null;
  } else {
    openCards.push(card);
  }
}

//comparing 2 cards at a time and then reseting open cards array
// add and remove classes function
function compareCards(thisCard, lastCard) {
  if (thisCard.innerHTML === lastCard.innerHTML) {
    addClasses(thisCard, lastCard, "add", ["match"]);
    matchedCards.push(thisCard, lastCard);

    openCards = [];
    endGame();
  } else {
    addClasses(thisCard, lastCard, "add", ["wrong"]);

    setTimeout(function() {
      addClasses(thisCard, lastCard, "remove", ["show", "open", "wrong"]);
    }, 800);

    openCards = [];
  }

  rank();
  moveCounter();
  endGame();
}

function addClasses(first, second, option, classes) {
  if (option === "remove") {
    first.classList.remove(...classes);
    second.classList.remove(...classes);
  } else if (option === "add") {
    first.classList.add(...classes);
    second.classList.add(...classes);
  }
}

/* when the number of the matched cards array is the same
as the total number of total cards show modul */
function endGame() {
  if (matchedCards.length === cards.length) {
    const winningText = document.querySelector(".winningText");
    winningText.innerHTML = `it only took you ${second} seconds, with ${currentMoves} moves`;
    const winningScore = document.querySelector(".winningScore");
    modulContainer.style.display = "block";

    if (currentMoves <= 16) {
      winningScore.innerHTML = "You got 3 stars!!";
    } else if (currentMoves >= 17 && currentMoves <= 22) {
      winningScore.innerHTML = "You got 2 stars!!";
    } else if (currentMoves >= 23 && currentMoves <= 26) {
      winningScore.innerHTML = "You got 1 star!!";
    } else if (currentMoves >= 27) {
      winningScore.innerHTML = "You didnt get any stars!!";
    }
    //stops timer if the game ends !!
    clearTimeout(time);
  }
}

//all the things that happen when the restart button is clicked
function restartGame() {
  modulContainer.style.display = "none";
  deck.innerHTML = "";
  matchedCards = [];
  clearTimeout(time);
  second = 0;
  timer.innerHTML = `${second}`;
  currentMoves = 0;
  moves.innerHTML = `${currentMoves}`;
  openCards = [];
  matchAttempts = 0;
  renderCards();
  modulContainer.style.display = "none";
  stars.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
}

//starting timer when game loads
function startTimer() {
  second += 1;
  timer.innerHTML = `${second}`;
  time = setTimeout(startTimer, 1000);
}

function moveCounter() {
  currentMoves += 1;
  moves.innerHTML = `${currentMoves}`;
}

function rank() {
  if (currentMoves === 17) {
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
  } else if (currentMoves === 23) {
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  } else if (currentMoves === 27) {
    stars.innerHTML = ``;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

renderCards();
