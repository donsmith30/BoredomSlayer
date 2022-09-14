let statusText = document.getElementById("statusText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
const PLAYER_O = "O";
const PLAYER_X = "X";
let currentPlayer = PLAYER_X;
let spaces = Array(9).fill(null);
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let running = false;

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
    evt.target.textContent = currentPlayer;

    // if (playerWon() !== false) {
    //   statusText = "you won!";
    //   let three_in_line = playerWon;

    //   three_in_line.map(
    //     (box) => (boxes[box].style.backgroundColor = winnerIndicator)
    //   );
    // }
    playerWon();
    changePlayer();
    // currentPlayer = currentPlayer == PLAYER_X ? PLAYER_O : PLAYER_X;
  }
}
function changePlayer() {
  currentPlayer = currentPlayer == PLAYER_X ? PLAYER_O : PLAYER_X;
  statusText.texContent = `${currentPlayer}'s turn`;
}

function playerWon() {
  // let roundWon = false;
  // for (const conditions of winningConditions) {
  //   let [a, b, c] = conditions;
  //   if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
  //     roundWon = true;
  //     break;
  //   }
  // }
  // if (roundWon) {
  //   statusText.textContent = `${currentPlayer} wins!`;
  //   running = false;
  // } else if (!spaces.fill[id]) {
  //   statusText.textContent = `Draw!`;
  //   running = false;
  // } else {
  //   }
}

function restartGame() {
  currentPlayer = PLAYER_X;
  statusText.texContent = `${currentPlayer}'s turn`;
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = ""; //for each box set back to blank.
    box.style.backgroundColor = "";
    running = true;
  });
}
