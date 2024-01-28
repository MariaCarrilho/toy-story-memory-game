// Constants

const nDifCardsEasy = 4;
const nDifCardsNormal = 5;
const nDifCardsHard = 9;
let nCards = 4;
let nColumns = 0;
const max = 9;
const min = 1;

// Variables
const cardContainer = document.querySelector(".container");
const level = document.querySelector(".level");
const startButton = document.querySelector(".start");

// Event Listeners
startButton.addEventListener("click", function () {
  if (level.value === "0") {
    alert("Please select a level!");
  }
  let numbersOfCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (level.value !== "hard") {
    numbersOfCards = [];
    while (numbersOfCards.length < nCards) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbersOfCards.includes(randomNumber))
        numbersOfCards.push(randomNumber);
    }
  }
  let index = 0;
  let allCards = document.querySelectorAll(".card.hidden");
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].setAttribute("id", index);
    allCards[
      i
    ].style.background = `url(../assets/imgs/${numbersOfCards[index]}.png) center/cover no-repeat`;
    allCards[i].style.backgroundPositionY = "center"; // Center vertically

    if ((i - 1) % 2 == 0) index++;
    allCards[i].innerHTML = "";
    allCards[i].classList.remove("hidden");
    allCards[i].classList.add("shown");
  }
});

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
