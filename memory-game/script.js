const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  // for (let color of colorArray) {
    for(let i=0; i< colorArray.length; i++) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(colorArray[i]);
    newDiv.setAttribute('data-itemNum', `item_${i+1}`)

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let clickCount = 0
const timeoutDuration = 1000
const matched = []
let matching = []
let firstClick = true;
let previousTarget = null;

function handleCardClick(event) {

  if (firstClick) {
    // This is the first click
    firstClick = false;
    previousTarget = event.target;
    matching.push(event.target)
    changeBgColor(event)
  } else {
    // This is the second click
    // secondBox = event.target
    if (event.target === previousTarget) {
      console.log("you can't pick the same square")
    } else {
      matching.push(event.target)
      changeBgColor(event)
      // checkifMatched()
      console.log(checkifMatched())
    }
    firstClick = true; // Reset for the next comparison
  }
}

let timeoutId
function resetClickCount() {

}
function changeBgColor(event) {
  let color = event.target.getAttribute("class")
  event.target.style.background = color
}

function checkifMatched() {
  if(matching[0].className === matching[1].className) {
    matched.push(matching)
    matching = []
    return "match"
  } else {
    matching = []
    return "don't match"
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
