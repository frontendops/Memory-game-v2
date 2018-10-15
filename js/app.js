const cards = [
    "diamond","diamond","leaf","leaf","paper-plane-o","paper-plane-o","anchor","anchor","bolt","bolt","cube","cube","bicycle","bicycle","bomb","bomb"
];
let openCards = [];
let matchedCards = [];
let shuffledCards = shuffle(cards);
let second = -1;
let timer = document.querySelector('.timer');
let restart = document.querySelector('.restart');
let moves = document.querySelector('.moves');
let currentMoves = 0;
const modulContainer =  document.querySelector('.modulContainer');
const button = document.querySelector('.button');
let stars = document.querySelector('.stars');


const deck = document.querySelector('.deck');

//rendering the cards and starting time
function renderCards() {
    for (let i = 0; i < cards.length; i++) {
        let card = document.createElement('li');
        card.innerHTML +=`<i class="fa fa-${cards[i]}"></i>`;
        card.classList.add('card');
        deck.appendChild(card);

        openCard(card);

    }
    shuffle(cards);


};

// what happens each time a card is clicked
function openCard(card) {
    card.addEventListener("click", function() {
        if (openCards.length === 1){
            const thisCard = card;
            const lastCard = openCards[0];

            card.classList.add('show', 'open');
            openCards.push(card)

            compareCards(thisCard, lastCard);
        } else {
            card.classList.add('show', 'open');
            openCards.push(card);
        }
    })
};

//comparing 2 cards at a time and then reseting open cards array
function compareCards(thisCard, lastCard) {
    if (thisCard.innerHTML === lastCard.innerHTML) {
        thisCard.classList.add('match');
        lastCard.classList.add('match');

        matchedCards.push(thisCard);
        matchedCards.push(lastCard);

        openCards = [];
        endGame();
    } else {
        thisCard.classList.add('wrong');
        lastCard.classList.add('wrong');

        setTimeout(function () {
            thisCard.classList.remove('show', 'open', 'wrong');
            lastCard.classList.remove('show', 'open', 'wrong');

        }, 800);

        openCards = [];
    }

    rank();
    moveCounter();
    endGame();
};

/* when the number of the matched cards array is the same
as the total number of total cards show modul */
function endGame() {
    if (matchedCards.length === cards.length) {

        const winningText = document.querySelector('.winningText');
        winningText.innerHTML= `it only took you ${second} seconds, with ${currentMoves} moves`;
        const winningScore = document.querySelector('.winningScore');
        modulContainer.style.display = "block";

        if ( currentMoves <= 16 ) {
            winningScore.innerHTML = 'You got 3 stars!!';
        } else if ( currentMoves >= 17 && currentMoves <= 22) {
            winningScore.innerHTML = 'You got 2 stars!!';
        } else if (currentMoves >= 23 && currentMoves <= 26) {
            winningScore.innerHTML = 'You got 1 star!!';
        } else if ( currentMoves >= 27 ) {
            winningScore.innerHTML = 'You didnt get any stars!!';
        }
//stops timer if the game ends !!
        clearTimeout(time);


    }
};

//all the things that happen when the restart button is clicked
function restartGame() {
        modulContainer.style.display = "none";
        deck.innerHTML="";
        matchedCards = [];
        clearTimeout(time);
        second = -1;
        currentMoves = 0;
        moves.innerHTML = `${currentMoves}`;
        openCards = [];
        renderCards();
        modulContainer.style.display = "none";
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`
}

//starting timer when game loads
function startTimer() {
    second += 1;
    timer.innerHTML = `${second}`;
    time = setTimeout(startTimer, 1000);
}

function firstClick() {
    if (openCards.length === 1) {
        startTimer();
    }
}

function moveCounter() {
    currentMoves += 1;
    moves.innerHTML = `${currentMoves}`
}

function rank () {
    if ( currentMoves === 17) {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`
    } else if  (  currentMoves === 23) {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>`
    } else if ( currentMoves === 27) {
        stars.innerHTML = ``
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

firstClick();
renderCards();
