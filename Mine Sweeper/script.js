/* -----Dataset for tiles on board----- */
const tileTypes = {
  Hidden: "hidden",
  Mine: "mine",
  Number: "number",
  //Marked: "marked",
};

/* -----Create Board-----  */
function generateBoard(boardSize, placedMines) {
  const board = [];
  const setMines = getMinePos(boardSize, placedMines); // # of mines as array of values from (const mines)
  console.log(setMines);

  for (let x = 0; x < boardSize; x++) {
    const row = []; //create row as array
    for (let y = 0; y < boardSize; y++) {
      //create new div element to store rows in
      const createdDiv = document.createElement("div");
      createdDiv.dataset.status = tileTypes.Hidden; //assign hidden status to tiles in created div

      const tile = {
        createdDiv,
        x,
        y,
        mine: setMines.some(positionMatch.bind(null, { x, y })), //checks if mine pos matches {a, b} position

        get status() {
          //get dataset status
          return this.createdDiv.dataset.status;
        },
        set status(value) {
          //set dataset status + value
          this.createdDiv.dataset.status = value;
        },
      };

      row.push(tile); //add tiles layout to rows
    }
    board.push(row); //add rows to created board
  }

  return board;
}

/* -----Board size & mines vars----- */
const bSize = 10;
const mines = 10;
/* -----Populate board----- */
const createdBoard = generateBoard(bSize, mines); //***--fully created game board--***
const boardElt = document.querySelector(".board"); //call selected div from html
console.log(createdBoard);

//loop through each row to add individual tiles. multi level array
createdBoard.forEach((row) => {
  row.forEach((tile) => {
    boardElt.append(tile.createdDiv); //once looped we add created rows/tiles to created div (board)
    tile.createdDiv.addEventListener("click", () => {
      console.log("clicked");
      showTiles(createdBoard, tile); //show tiles on click
    });
  });
});

boardElt.style.setProperty("--size", bSize); //assigns template size according to size of board

/* -----Populate Mines----- */
function getMinePos(boardSize, placedMines) {
  const placement = [];
  //place mines at random positions
  while (placement.length < placedMines) {
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
/* -----Check for coordinates----- */
function positionMatch(a, b) {
  //checks coordinates of positions. if true = same pos
  return a.x === b.x && a.y === b.y;
}
/* -----Reveal Tiles on Click----- */
function showTiles(createdBoard, tile) {
  console.log(tile);
  if (tile.status !== tileTypes.Hidden) {
    return; //reveal tile if its not hidden (grey)
  }

  if (tile.mine) {
    tile.status = tileTypes.Mine;
    return; //reveal tile if its a mine (red)
  }

  tile.status = tileTypes.Number; //reveal tile if its a number
  const proximityTiles = nearTiles(createdBoard, tile);
  const nearMines = proximityTiles.filter((t) => t.mine);
  if (nearMines.length === 0) {
    proximityTiles.forEach(showTiles.bind(null, createdBoard)); //will display non mined/number tiles when clicked
  } else {
    tile.createdDiv.textContent = nearMines.length; //will display number of mines in proximity
  }
}

function nearTiles(createdBoard, { x, y }) {
  const tiles = [];

  for (let pos1 = -1; pos1 <= 1; pos1++) {
    for (let pos2 = -1; pos2 <= 1; pos2++) {
      const tile = createdBoard[x + pos1]?.[y + pos2];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
}
/* */
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
  return board.every((row) => {
    return row.every((tile) => {
      return (
        t.status === tileTypes.Number || //is tile a number?
        (tile.mine && tile.status === tileTypes.Hidden)
      ); //is tile a mine or hidden?
    });
  });
}

function loser() {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === tileTypes.Mine; //checks if a mine is clicked. if true, you lose
    });
  });
}
