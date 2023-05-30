const gameBoard = (() => {
  const board = new Array(9).fill('O');
  return { board };
})();

const gameLogic = (() => {
  /* Logic goes here */
})();

const displayController = (() => {
  const buttons = document.querySelectorAll(".board-container > div > button");
  const renderGameBoard = (gameBoard) => {
    index = 0;
    for (let button of buttons) {
      button.textContent = gameBoard[index];
      index++;
    }
  };
  return { renderGameBoard };
})();

const playerFactory = (mark) => {
  return { mark };
};
