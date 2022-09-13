/* Dataset for tiles on board */
const tileTypes = {
  Hidden: "hidden",
  Mine: "mine",
  Number: "number",
};

/* Create Board  */
function generateBoard(boardSize, populateMines) {
  const board = [];
  const setMines = getMinePos(boardSize, populateMines);

  for (let a = 0; a < boardSize; a++) {
    const row = []; //create row as array
    for (let b = 0; b < boardSize; b++) {
      //create new div element to store rows in
      const createdDiv = document.createElement("div");
      createdDiv.dataset.status = tileTypes.Hidden; //assign hidden status to tiles in created div

      const tile = {
        a,
        b,
        mine: setMines.some(positionMatch.bind(null, { a, b })), //checks if mine pos matches {x, y} pos
        createdDiv,
        get status() {
          return this.createdDiv.dataset.status;
        },
        set status(value) {
          this.createdDiv.dataset.status = value;
        },
      };
      row.push(tile); //add tiles layout to rows
    }
    board.push(row); //add rows to created board
  }

  return board; //created board
}

/* Board size & mines vars */
const bSize = 8;
const mines = 8;

/* Populate board */
const createdBoard = generateBoard(bSize, mines); //assign value & params
const boardElt = document.querySelector(".board"); //call selected div from html

createdBoard.forEach((row) => {
  //***loop through each row to add individual tiles. multi level array
  row.forEach((tile) => {
    boardElt.append(tile.createdDiv); //once looped we add created rows/tiles to created div (board)
  });
});

boardElt.style.setProperty("--size", bSize); //assigns template size according to size of board

/* Populate Mines */
function getMinePos(boardSize, populateMines) {
  const placement = [];

  //place mines at random positions
  while (placement.length < populateMines) {
    const target = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };
    //check is a position already exists
    if (!placement.some(positionMatch.bind(null, target))) {
      placement.push(target); //if x, y positions are not match, we add to the array
    }
  }

  return placement;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size); //converts random # to integer
}

function positionMatch(a, b) {
  //checks coordinates of positions. if true = same pos
  return a.x === b.x && a.y === b.y;
}
