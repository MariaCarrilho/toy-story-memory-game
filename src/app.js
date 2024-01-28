// Constants

const nDifCardsEasy = 4;
const nDifCardsNormal = 5;
const nDifCardsHard = 9;
let nCards = 4;
let nColumns = 0;

// Variables

const cardContainer = document.querySelector(".container");
const level = document.querySelector(".level");
const startButton = document.querySelector(".start");
// Event Listeners
startButton.addEventListener("click", startLevel());
// Functions

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

function addCards() {
  cardContainer.style.gridTemplateColumns = `repeat(${nColumns}, auto)`;
  for (let i = 0; i < nCards * 2; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("hidden");
    cardContainer.append(card);
    card.innerHTML =
      '<i class="fa-solid fa-question" style="font-size:1.5rem"></i>';
  }
}
function startLevel() {
  if (level.value === "0") {
    alert("Please select a level!");
  }
}
