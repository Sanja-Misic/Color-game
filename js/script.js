'use strict'

///////// Variables
//colors
const displayPickedColor = "#fff";
// player name element
let playerName = document.querySelector(".player-name");
let inputName = document.querySelector(".player-name-input");
const newPlayerNameButton = document.querySelector(".new-player-name-button");
const startButton = document.querySelector(".new-player-start-button");

// guessing color element
let colorDisplay = document.querySelector(".guessing-color");

// give random color elment
let newColorButton = document.querySelector(".new-color__button");
const newColorDropDown = document.querySelector(".new-color__drop-down");
const rgbButton = document.querySelector(".drop-down-button-rgb");
const hexButton = document.querySelector(".drop-down-button-hex");

//choice of colors element
let squares =document.querySelectorAll(".color")

//scoreboard element
let scoreboardNamesDisplay = document.querySelectorAll('.scoreboard__table-data-name');
let scoreboardScoreDisplay = document.querySelectorAll('.scoreboard__table-data-score');

//finish game element
let finishGame = document.querySelector('.finish-game');
let finishGamePlayer = document.querySelector('.finish-game__player')
let finishGameScore = document.querySelector('.finish-game__score')

//other variables
let score;
let currentPlayer = -1;

let colors = [];

let pickedColor;

let scoreboardNames = ["Player", "Player", "Player", "Player", "Player", "Player", "Player", "Player", "Player", "Player"];
let scoreboardScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


/////////////////////////////////////
newColorButton.disabled = true;
squares.forEach(square => square.style.pointerEvents = "none")
colorDisplay.textContent = "color for guessing"
 
////////////////////////////
//new player function
const newPlayerNameFunction = () => {
    playerName.style.display = "none";
    inputName.style.display = "block";
    newPlayerNameButton.style.display = "none";
    startButton.style.display = "block";

    //reset guessing color element
    colorDisplay.style.backgroundColor = "#f5f5dc";
    colorDisplay.style.fontSize = "2.6rem"
    colorDisplay.textContent = "color for guessing"

    //clean placeholoder
    if (inputName.value !=="") {
        inputName.value = ""
    }

    squares.forEach((square) => {
        square.style.backgroundColor = "eee"
        square.classList.remove("hide")});

    score = 5
    currentPlayer = currentPlayer + 1
    }

    

//start game function
const startFunction = () => {
    
    if (inputName.value) {
        playerName.textContent = inputName.value
        newColorButton.disabled = false;
        playerName.style.display = "block";
        inputName.style.display = "none";
        newPlayerNameButton.style.display = "block";
        startButton.style.display = "none";
        newPlayerNameButton.disabled = true;

    } else {
        inputName.placeholder = 'Enter player name'      
    }
}
///////////////////////////
//New color drop down
const newColorDropDownFunction = () => {
    newColorDropDown.style.display = "flex"
}

//Random geneate colors
const hex = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','F'];
const rgb = () => Math.floor(Math.random() * 255 + 1)

const colorHex= () => {
    let hexKey ="#"
    for(let i=0; i<6; i++){
        const index = Math.floor(Math.random() * hex.length);
        hexKey = hexKey + hex[index]
    }
    return hexKey
    
}

//rgb hex generate random color
const generateRandomColorRgb = () => {
    for(let i = 0; i < squares.length; i++) {
        colors.push(
        `rgb(${rgb()},${rgb()},${rgb()})`
        )
    }    
}

const generateRandomColorHex = () => {
    for(let i = 0; i < squares.length; i++) {
        colors.push(
        colorHex()
        )
    }    
}

//rgb hex button functions
const rgbButtonFunction = () => {
    colors = [];
    generateRandomColorRgb();
    setColors();
    pickedColor = getRandomPickedColor();
    squares.forEach(square => square.style.pointerEvents = "auto")
    newColorDropDown.style.display = "none"
    newColorButton.disabled = true;
}

const hexButtonFunction = () => {
    colors = [];
    generateRandomColorHex();
    setColors();
    pickedColor = getRandomPickedColor();
    squares.forEach(square => square.style.pointerEvents = "auto")
    newColorDropDown.style.display = "none"
    newColorButton.disabled = true;
}

//set colors
const setColors = () => {
    colors.forEach((color, index) =>{
        squares[index].style.backgroundColor = color;
        squares[index].setAttribute('data-color', color);
    })
}

//set picked color
const getRandomPickedColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    colorDisplay.textContent = randomColor;
    return randomColor;
}

//check colors
const checkColor = () => { 
    squares.forEach(square => {
        square.addEventListener("click", (e) => {
           
            if(e.target.dataset.color === pickedColor) {
                colorDisplay.style.backgroundColor = pickedColor;
                updateScoreboard(currentPlayer, inputName.value, score);
                finishGame.style.display = "block"


            }
            else {
                e.target.classList.add("hide")
                score --
            }
        })
    })
}

//finish game function
const finishGameFunction = () => {
    finishGame.style.display = "none";
    squares.forEach(square => square.classList.remove("hide"));
    squares.forEach(square => square.style.backgroundColor = "#eee");
    newPlayerNameButton.disabled = false;
    playerName.textContent = "Player 1"
    squares.forEach(square => square.style.pointerEvents = "none");
    colorDisplay.textContent = "color for guessing"
    colorDisplay.style.backgroundColor = displayPickedColor;
}

//update scoreboard function
const updateScoreboard = (playerIndex, playerName, playerScore) => {
    scoreboardNames[playerIndex] = playerName;
    scoreboardScore[playerIndex] = playerScore;
    document.querySelector(`.scoreboard__table-data-name-${playerIndex + 1}`).textContent = playerName
    document.querySelector(`.scoreboard__table-data-score-${playerIndex + 1}`).textContent = playerScore
}

//////////////////////////////////////////////////////////
checkColor()
newPlayerNameButton.addEventListener('click', newPlayerNameFunction);
startButton.addEventListener('click', startFunction);
newColorButton.addEventListener('click', newColorDropDownFunction);

rgbButton.addEventListener('click', rgbButtonFunction)
hexButton.addEventListener('click', hexButtonFunction)

finishGame.addEventListener("click", finishGameFunction)





