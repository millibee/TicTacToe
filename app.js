const theCells = document.querySelectorAll(".row > div");
console.log(theCells);
for (let i = 0; i < theCells.length; i++) {
  theCells[i].addEventListener("click", clickACell);
}

let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let currentPlayer = "X";
// console.log(currentPlayer);

let winningPlayer = "Player " + currentPlayer + " wins";
// console.log(winningPlayer);

let drawMessage = "It was a DRAW!";
// console.log(drawMessage);

let currentPlayerTurn = "It is " + currentPlayer + " turn!";
// console.log(currentPlayerTurn);

let turnText = document.getElementById('turn-text')
turnText.innerHTML = currentPlayerTurn;

function clickACell(event) {
  event.target.textContent = "X";
  let cellClicked = event.target; 
  let clickedIndex = parseInt(cellClicked.getAttribute('div'));
  if (gameState[clickedIndex] !== "" || !gameActive) {
    return;
  }
  switchPlayers();
  cellPlayed(cellClicked, clickedIndex);
  checkResult();
  console.log(clickACell);
}
function cellPlayed(cellClicked, clickedIndex) {
  gameState[clickedIndex] = currentPlayer;
  cellClicked.innerHTML = currentPlayer;
  
}
function switchPlayers() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
    // currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnText.innerHTML = currentPlayerTurn;
}
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkResult() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    let winCombo = winningCombos[i];
    let j = gameState[winCombo[0]];
    let k = gameState[winCombo[1]];
    let l = gameState[winCombo[2]];
    if (j === '' || k === '' || l === '') {
      continue;
    }
    if (j === k && k === l) {
      roundWon = true;
    }
  }
  if (roundWon) {
    theCells.innerHTML = winningPlayer();
    gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    theCells.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  switchPlayers();
}



function restartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
    turnText.innerHTML = currentPlayerTurn;
    document.querySelectorAll('div').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('div').forEach(cell => cell.addEventListener('click', clickACell));
document.getElementById("reset-button").addEventListener("click", restartGame);
