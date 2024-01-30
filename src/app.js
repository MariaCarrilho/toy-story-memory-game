// Constants

const nDifCardsEasy = 4;
const nDifCardsNormal = 5;
const nDifCardsHard = 9;
const max = 9;
const min = 1;

// Variables
let nColumns = 0;
let matches = 0;
let idImage = [];
let nCards = 4;
let cardsToPlay = document.querySelectorAll(".card.hidden");
const cardContainer = document.querySelector(".container");
const level = document.querySelector(".level");
const startButton = document.querySelector(".start");
let flippedCards = [];

// Event Listeners
startButton.addEventListener("click", function () {
  idImage = [];
  idImage.length = 0;
  if (level.value === "0") {
    alert("Please select a level!");
    return;
  }
  let numbersOfCards = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
    (a, b) => 0.5 - Math.random()
  );
  if (level.value !== "hard")
    numbersOfCards = arrayWithRandomNumbers(nCards, min, max);
  let index = 0;
  let allCards = document.querySelectorAll(".card.hidden");
  let shuffle = arrayWithRandomNumbers(nCards * 2, 0, nCards * 2 - 1);
  for (i = 0; i < allCards.length; i++) {
    allCards[shuffle[i]].setAttribute("data-id", index);
    allCards[shuffle[i]].setAttribute("id", i);
    idImage.push({
      id: `${i}`,
      background: `url(../assets/imgs/${numbersOfCards[index]}.png) center/cover no-repeat`,
    });
    if ((i - 1) % 2 == 0) index++;
    allCards[shuffle[i]].addEventListener("click", flipCard);
  }

  startButton.innerText = "Pause";
  startButton.classList.toggle("start");
});

// Functions
function flipCard(event) {
  let card = event.target;
  if (card.classList.toString().includes("hidden")) {
    const cardId = card.getAttribute("id");
    const cardDataId = card.getAttribute("data-id");
    flippedCards.push({ id: cardId, dataId: cardDataId });
    let backgroundStyle = null;
    for (i = 0; i < idImage.length; i++) {
      if (idImage[i].id === cardId) {
        backgroundStyle = idImage[i].background;
        break;
      }
    }
    card = revealCard(card, backgroundStyle);
    if (flippedCards.length === 2) {
      if (flippedCards[0].dataId !== flippedCards[1].dataId) {
        const card1 = document.getElementById(flippedCards[0].id);
        const card2 = document.getElementById(flippedCards[1].id);
        setTimeout(function () {
          hideCard(card1);
          hideCard(card2);
        }, 1000);
      } else {
        matches++;
        if (matches === nCards)
          setTimeout(function () {
            endGame();
          }, 1000);
      }
      flippedCards.length = 0;
      flippedCards = [];
    }
  }
}

function endGame() {
  startButton.innerText = "Start";
  startButton.classList.toggle("start");
  document.querySelectorAll(".card.shown").forEach((card) => {
    hideCard(card);
  });
  matches = 0;
  document
    .querySelector(".fa.fa-window-close")
    .addEventListener("click", function () {
      document.querySelector(".modal").style.display = "none";
    });
  document.querySelector(".modal").style.display = "block";
}

function getSelectedOption() {
  if (level.value === "easy" || level.value === "0") {
    nCards = nDifCardsEasy;
    nColumns = nDifCardsEasy;
  } else if (level.value === "normal") {
    nCards = nDifCardsNormal;
    nColumns = nDifCardsNormal;
  } else if (level.value === "hard") {
    nCards = nDifCardsHard;
    nColumns = 6;
  }
  cleanGame();
  addCards();
}

function cleanGame() {
  while (cardContainer.firstChild)
    cardContainer.removeChild(cardContainer.firstChild);
}

function revealCard(card, background) {
  card.classList.remove("hidden");
  card.classList.add("shown");
  card.innerHTML = "";
  card.style.background = background;
  card.style.backgroundColor = "transparent";
  return card;
}

function hideCard(card) {
  card.classList.add("hidden");
  card.classList.remove("shown");
  card.style.backgroundImage = "none";
  card.style.backgroundColor = "#99b2dd";
  card.innerHTML =
    '<i class="fa-solid fa-question" style="font-size:1.5rem; transform: scaleX(-1)"></i>';
  return card;
}

function addCards() {
  cardContainer.style.gridTemplateColumns = `repeat(${nColumns}, auto)`;
  for (let i = 0; i < nCards * 2; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("hidden");
    cardContainer.append(card);
    card.innerHTML =
      '<i class="fa-solid fa-question" style="font-size:1.5rem; transform: scaleX(-1)"></i>';
  }
}

function arrayWithRandomNumbers(length, min, max) {
  let result = [];
  while (result.length < length) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!result.includes(randomNumber)) {
      result.push(randomNumber);
    }
  }
  return result;
}
