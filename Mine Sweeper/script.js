/* Dataset for tiles on board */
const tileTypes = {
  Hidden: "hidden",
  Mine: "mine",
  Number: "number",
  //Marked: "marked",
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

  return board;
}

/* Board size & mines vars */
const bSize = 5;
const mines = 5;

/* Populate board */
const createdBoard = generateBoard(bSize, mines); //assign value & params
const boardElt = document.querySelector(".board"); //call selected div from html
const remainingMines = document.querySelector("[data-mines]");

createdBoard.forEach((row) => {
  //***loop through each row to add individual tiles. multi level array
  row.forEach((tile) => {
    boardElt.append(tile.createdDiv); //once looped we add created rows/tiles to created div (board)
    tile.createdDiv.addEventListener("click", () => {
      console.log("clicked");
      showTiles(createdBoard, tile); //show tiles on click
    });
  });
});

boardElt.style.setProperty("--size", bSize); //assigns template size according to size of board
remainingMines.textContent = mines; //populates mines into html tag

/* Populate Mines */
function getMinePos(boardSize, populateMines) {
  const placement = [];
  //place mines at random positions
  while (placement.length < populateMines) {
    const target = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };
    //check if a position already exists
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

function showTiles(tile) {
  console.log(tile);
  if (tile.status !== tileTypes.Hidden) {
    return;
  }
  if (tile.mine) {
    tile.status = tileTypes.Mine;
    return;
  }
  tile.status = tileTypes.Number;

  const proximityTiles = nearTiles(board, tile);
  const nearMines = proximityTiles.filter((t) => t.mine);
  if (nearMines.length === 0) {
    proximityTiles.forEach(showTiles.bind(null, board)); //will display non mined/number tiles when clicked
  } else {
    tile.element.textContent = mines.length;
  }
}

function nearTiles(board, { a, b }) {
  const tiles = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const tile = board[a + x]?.[b + y];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
}

function winLose() {
  const win = winner(board);
  const lose = loser(board);

  if (win || lose) {
    boardElt.addEventListener("click", stopProp, { capture: true });
    boardElt.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    //add gif here
  }
  if (lose) {
    //add gif here
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.mine) showTiles(board, tile); //reveals mines on lose
      });
    });
  }
}

//stops events from going further to tiles
function stopProp(e) {
  e.stopImmediatePropagation();
}

function winner() {
  return true;
}

function loser() {}

// function markTiles(tile) {
//   if (tile.status !== tileTypes.Hidden && tile.status !== tileTypes.Marked) {
//     return;
//   }
//   if (tile.status === tileTypes.Marked) {
//     tile.status = tileTypes.Hidden;
//   } else {
//     tile.status = tileTypes.Marked;
//   }
// }
