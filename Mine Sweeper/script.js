/*-----Pop-over on win/lose----- */
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
  const setMines = getMinePos(boardSize, placedMines);
  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const createdDiv = document.createElement("div");
      createdDiv.dataset.status = tileTypes.Hidden;

      const tile = {
        createdDiv,
        x,
        y,
        mine: setMines.some(positionMatch.bind(null, { x, y })),

        //Get/Set Datasets
        get status() {
          return this.createdDiv.dataset.status;
        },
        set status(value) {
          this.createdDiv.dataset.status = value;
        },
      };

      row.push(tile);
    }
    board.push(row);
  }

  return board;
}

/* -----Populate board----- */
const createdBoard = generateBoard(bSize, mines);
const boardElt = document.querySelector(".board");

//loop through each row to add individual tiles.
createdBoard.forEach((row) => {
  row.forEach((tile) => {
    boardElt.append(tile.createdDiv);
    tile.createdDiv.addEventListener("click", () => {
      showTiles(createdBoard, tile);
      winLose();
    });
  });
});

boardElt.style.setProperty("--size", bSize);

/* -----Populate Mines----- */
function getMinePos(boardSize, placedMines) {
  const placement = [];

  while (placement.length < placedMines) {
    const target = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!placement.some(positionMatch.bind(null, target))) {
      placement.push(target);
    }
  }
  return placement;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}
/* -----Check for coordinates----- */
function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}
/* -----Reveal Tiles on Click----- */
function showTiles(createdBoard, tile) {
  if (tile.status !== tileTypes.Hidden) {
    return;
  }

  if (tile.mine) {
    tile.status = tileTypes.Mine;
    return;
  }
  tile.status = tileTypes.Number;

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
    boardElt.addEventListener("click", stopProp, { capture: true });
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

function resetGame() {
  document.getElementById("gameForm").reset();
}
