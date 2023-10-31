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
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let clickCount = 0
const timeoutDuration = 1000

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  //check how many clicks?
  if (clickCount < 2) {
    clickCount++;
    changeBgColor(event)
  }
  if (clickCount === 2) {
    // Disable the button to prevent further clicks
    gameContainer.disabled = true
  }
  
  //setTimeout
  clearTimeout(timeoutId);
  timeoutId = setTimeout(resetClickCount, timeoutDuration)
}

let timeoutId
function resetClickCount() {
  const bgColor = document.querySelectorAll("#game div")
  console.log(bgColor)
  clickCount = 0
  gameContainer.disabled = false
  // ! problem with this... is that it selects all of them... not only the 2 freshly selected ones
  // ! maybe i need to put them in an array..
  // ! one for matched already and one for currently matching
  bgColor.forEach(div => div.style.background = "")
}
function changeBgColor(event) {
  let color = event.target.getAttribute("class")
  event.target.style.background = color
}

// when the DOM loads
createDivsForColors(shuffledColors);
