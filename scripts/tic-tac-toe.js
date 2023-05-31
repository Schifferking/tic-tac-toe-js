const gameBoard = (() => {
  const _board = new Array(9).fill('');
  const getBoard = () => _board;
  const placeMark = (index, mark) => _board[index] = mark;
  return { getBoard, placeMark };
})();

const playerFactory = (mark) => {
  const getMark = () => mark;
  return { getMark };
};

const displayController = (() => {
  const _h2 = document.querySelector("h2");
  const updateH2 = (text) => _h2.textContent = text;
  return { updateH2 };
})();

const gameLogic = (() => {
  const _buttons = document.querySelectorAll(".board-container > div > button");
  const _playerX = playerFactory('X'); 
  const _playerO = playerFactory('O'); 
  let _currentPlayer = _playerX;
  const _updateCurrentPlayer = () => {
    _currentPlayer = _currentPlayer === _playerX ? _playerO : _playerX;
  };
  const _getCurrentPlayer = () => _currentPlayer;
  const _placeMark = (button) => {
    if (button.textContent === '') {
      index = Number(button.getAttribute("data-index"));
      mark = _getCurrentPlayer().getMark();
      gameBoard.placeMark(index, mark);
      button.textContent = mark;
      _startNewRound();
    } else return;
  };
  const _startNewRound = () => {
    _updateCurrentPlayer();
    displayController.updateH2(`${_currentPlayer.getMark()} player's turn`);
  };
  const setButtonsListeners = () => {
    for (let button of _buttons) {
      button.addEventListener("click", function(event){
        _placeMark(event.target);
      });
    }
  };
  return { setButtonsListeners };
})();

gameLogic.setButtonsListeners();
