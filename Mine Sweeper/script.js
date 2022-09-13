/* Dataset for tiles on board */
const tileTypes = {
  Hidden: "hidden",
  Mine: "mine",
  Number: "number",
};

/* Create grid layout  */

function generateBoard(boardSize, numMines) {
  const board = [];

  for (let a = 0; a < boardSize; a++) {
    const row = [];
    for (let b = 0; b < boardSize; b++) {
      const newElement = document.createElement("div");
      newElement.dataset.status = tileTypes.Hidden;

      const tile = {
        a,
        b,
        newElement,
      };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
}
//console.log(generateBoard(5, 5));

/* Populate grid onto body element */
const gridBoard = generateBoard(5, 5);
const bodyGrid = document.getElementById("body");
gridBoard.forEach((row) => {
  row.forEach((tile) => {
    bodyGrid.append(tile.newElement);
  });
});
