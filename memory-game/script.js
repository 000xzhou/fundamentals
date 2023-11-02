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
    const card = document.createElement("div");
    const cardInner = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");
    // give it a class attribute for the value we are looping over
    card.classList.add(colorArray[i]);
    cardFront.setAttribute('data-id', `item_${i+1}`)
    cardFront.setAttribute('data-color', colorArray[i])
    cardBack.setAttribute('data-color', colorArray[i])
    card.setAttribute("class", "flip-card")

    // call a function handleCardClick when a div is clicked on
    card.addEventListener("click", handleCardClick);

    cardInner.setAttribute("class", "inner")
    cardFront.setAttribute("class", "front")
    cardBack.setAttribute("class", "back")
    cardBack.style.background = colorArray[i]
    
    // append the div to the element with an id of game
    gameContainer.append(card);
    card.append(cardInner);
    cardInner.append(cardFront);
    cardInner.append(cardBack);
  }
  createClickCount()
}

// TODO: Implement this function!
let clickCount = 0
const timeoutDuration = 1000
let matched = []
let matching = []
let previousTarget = null;

function handleCardClick(event) {
  if (matching.length == 0) {
    // check if it been match already
    // console.log(matched.includes(event.target.previousElementSibling))
    if(matched.includes(event.target.getAttribute("data-color"))){
      return
    }

      previousTarget = event.target
      // console.log(event.target)
      matching.push(event.target)
      // clickCount++
      clickCount++
    document.querySelector("h2").textContent = clickCount
      // event.target.classList.add("flip")
      event.target.parentElement.classList.add("flip")
      event.target.parentElement.parentElement.classList.add("flip")
      // changeBgColor(event)
  } else if (matching.length == 1){
    // This is the second click
    // console.log("checking " + event.target.getAttribute("data-color"))
    // console.log(matched.includes(event.target.getAttribute("data-color")))
    if(matched.includes(event.target.getAttribute("data-color"))){
      return
    }
    if (event.target === previousTarget) {
      console.log("you can't pick the same square")
    } else {
      matching.push(event.target)
      // clickCount++
      clickCount++
    document.querySelector("h2").textContent = clickCount
      event.target.parentElement.classList.add("flip")
      event.target.parentElement.parentElement.classList.add("flip")
      // changeBgColor(event)
      // disable clicking
      // console.log(matching[1])
      checkifMatched()
      //enable clicking
      // setTimeout(()=> {
      //   gameContainer.disabled = false
      // }, 1000)
      // new Promise(resolve => setTimeout(resolve, 1000));
    }
    firstClick = true; // Reset for the next comparison
  }
}

// function changeBgColor(event) {
//   let color = event.target.getAttribute("class")
//   event.target.classList.add("flip")
// }

function checkifMatched() {
  if(matching[0].getAttribute("data-color")=== matching[1].getAttribute("data-color")) {
    matched.push(matching[0].getAttribute("data-color"))
    // keeps card face up
    matching = []
    if(isGameComplete()) {
      //display message
      displayMessage()
    }
    return "match"
  } else {
    // keep face down
    setTimeout(() => {
      // matching[0].style.background = ""
      // matching[1].style.background = ""
      // console.log(matching[0].parentElement)
      matching[0].parentElement.classList.remove("flip")
      matching[0].parentElement.parentElement.classList.remove("flip")
      matching[1].parentElement.classList.remove("flip")
      matching[1].parentElement.parentElement.classList.remove("flip")
      // resetCards();
      matching = []
    }, 1000)
    return "don't match"
  }
}
function startGame() {
  let shuffledColors2 = shuffle(COLORS)
  gameContainer.innerHTML = ""
  matching = []
  matched = []
  clickCount = 0
  document.querySelector("h2").remove()
  createDivsForColors(shuffledColors2);
}

function displayMessage() { 
  let message = document.createElement("div")
  let messageBox = document.createElement("div")
  let one = document.createElement("div")
  let two = document.createElement("div")
  let three = document.createElement("div")
  one.textContent = `Congrates! you beat the game.`
  two.textContent = `Click this box to a start new game.`
  three.textContent = `\nTotal click Count: ${clickCount}`
  message.classList.add("message")
  messageBox.classList.add("messageBox")
  messageBox.append(one)
  messageBox.append(two)
  messageBox.append(three)
  message.append(messageBox)
  document.body.appendChild(message)
  message.addEventListener("click", () => {
    endGame()
    startGame()
  })
}

function isGameComplete() {
  // 
  // console.log(matched)
  return COLORS.length/2 == matched.length 
  && COLORS.every((value) => matched.includes(value))
}

function endGame() {
  const existingElement = document.querySelector(".message")
  if (existingElement) {
  existingElement.remove()
  }
}

function createClickCount() {
  const h1 = document.querySelector("h1")
  const clickHeading = document.createElement("h2")
  clickHeading.classList.add = "clickCount"
  h1.appendChild(clickHeading)
  clickHeading.textContent = clickCount
}

// when the DOM loads
createDivsForColors(shuffledColors);

const btn = document.querySelector("button")
btn.addEventListener("click", startGame)
















// function arraysEqual(arr1, arr2) {
//   return arr1.every((value) => arr2.includes(value));
// }
// console.log(arraysEqual(["red","green"], ["red"]))
// console.log(arraysEqual(["red","green"], ["red","green"]))
// console.log(arraysEqual(["red","red", "green", "green"], ["red","green"]))
// console.log(arraysEqual(["red","green"], ["red","red", "green", "green"]))



