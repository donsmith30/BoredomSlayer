let statusText = document.getElementById("statusText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
const PLAYER_O = "O";
const PLAYER_X = "X";
let currentPlayer = PLAYER_X;
let gameStatus = "loser";
let spaces = Array(9).fill(null);
let running = false;
let round = 0;
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
}

function boxClicked(evt) {
  const id = evt.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    round++;
    evt.target.textContent = currentPlayer;
    gameOver(spaces);
  }
}
function changePlayer() {
  if (currentPlayer === PLAYER_X) {
    currentPlayer = PLAYER_O;
  } else {
    currentPlayer = PLAYER_X;
  }
  statusText.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
  resetRound();
  changePlayer();
  statusText.texContent = `${currentPlayer}'s turn`;
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = ""; //for each box set back to blank.
    box.style.backgroundColor = "";
    running = true;
  });
}
function gameOver(space) {
  if (round > 8) {
    declareTie();
  } else {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (space[a] && space[a] === space[b] && space[a] === space[c]) {
        console.log(round);
        declareWinner();

        //add points
        restartGame();
        return space[a];
      }
    }
  }
  console.log(round);
  changePlayer();
  return null;
}
function declareWinner() {
  resetRound();
  setEndgameModal("tic tac toe", `${currentPlayer} won the game! GOOD GAME!`);
}
function declareTie() {
  resetRound();
  setEndgameModal("game tie!", `It's a tie! Well...Play again`);
}

function setEndgameModal(query, text) {
  tenorService.grabData(query, text);
}
function resetRound() {
  round = 0;
}
