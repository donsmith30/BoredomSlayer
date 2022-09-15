const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

/* -----Dataset for tiles on board----- */
const bSize = 10;
const mines = 12;

const tileTypes = {
  Hidden: "hidden",
  Mine: "mine",
  Number: "number",
};

/* -----Create Board-----  */
function generateBoard(boardSize, placedMines) {
  const board = [];
  const setMines = getMinePos(boardSize, placedMines); // # of mines as array of values from (const mines)
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
          return this.createdDiv.dataset.status; //get dataset status
        },

        set status(value) {
          this.createdDiv.dataset.status = value; //set dataset status + value
        },
      };

      row.push(tile); //add tiles layout to rows
    }
    board.push(row); //add rows to created board
  }

  return board;
}

/* -----Populate board----- */
const createdBoard = generateBoard(bSize, mines); //***--fully created game board--***
const boardElt = document.querySelector(".board"); //call selected div from html

//loop through each row to add individual tiles. multi level array
createdBoard.forEach((row) => {
  row.forEach((tile) => {
    boardElt.append(tile.createdDiv); //once looped we add created rows/tiles to created div (board)
    tile.createdDiv.addEventListener("click", () => {
      showTiles(createdBoard, tile); //show tiles on click
      winLose(); //checks for win or lose
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

function winLose() {
  const win = winner(createdBoard);
  const lose = loser(createdBoard);

  if (win || lose) {
    boardElt.addEventListener("click", stopProp, { capture: true }); //stops events from continuing (click)
  }

  if (win) {
    let tenorSearch = "";
    let message = "";
    tenorSearch = "great job";
    message = "YOU CLEARED THE GRID!!!";
    endGameGif(tenorSearch, message);
  }

  if (lose) {
    let message = "";
    let tenorSearch = "";
    //on lose, display all mine pos
    createdBoard.forEach((row) => {
      row.forEach((tile) => {
        if (tile.mine) showTiles(createdBoard, tile);
      });
    });
    tenorSearch = "exploding";
    message = "YOU HIT A MINE!!! Walk it off. Hit 'Reset Game' to play again";
    endGameGif(tenorSearch, message);
  }
}

function stopProp(evt) {
  evt.stopImmediatePropagation();
}

function winner(onBoard) {
  return onBoard.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === tileTypes.Number ||
        (tile.mine && tile.status == tileTypes.Hidden)
      );
    });
  });
}

function loser(onBoard) {
  return onBoard.some((row) => {
    return row.some((tile) => {
      if (tile.status === tileTypes.Mine) {
        return tile.mine;
      }
    });
  });
}

function endGameGif(query, text) {
  tenorService.grabData(query, text);
}
