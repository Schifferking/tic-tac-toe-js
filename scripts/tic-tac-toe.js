const gameBoard = (() => {
  const _board = new Array(9).fill('');
  const getBoard = () => _board;
  const placeMark = (index, mark) => _board[index] = mark;
  const _getRows = () =>{
    return [_board.slice(0, 3), _board.slice(3, 6), _board.slice(6)];
  };
  const _getColumns = () => {
    return [[_board[0], _board[3], _board[6]],
            [_board[1], _board[4], _board[7]],
            [_board[2], _board[5], _board[8]]];
  };
  const _getDiagonals = () => {
    return [[_board[0], _board[4], _board[8]],
            [_board[2], _board[4], _board[6]]];
  };
  const getLines = () => {
    return _getRows().concat(_getColumns(), _getDiagonals());
  };
  const isNotBoardFull = () => _board.includes('');
  return { getBoard, getLines, isNotBoardFull, placeMark };
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
  const _isGameVictory = (line, mark) => {
    return JSON.stringify(line) === JSON.stringify(new Array(3).fill(mark)) ? true : false;
  };
  const gameResult = () => {
    for (let line of gameBoard.getLines()) {
      if (_isGameVictory(line, mark)) return `Player ${mark} won the game`;
    }
    if (gameBoard.isNotBoardFull() === false) return 'Draw';
  };
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
    displayController.updateH2(`Player ${_currentPlayer.getMark()}'s turn`);
  };
  const setButtonsListeners = () => {
    for (let button of _buttons) {
      button.addEventListener("click", function(event){
        _placeMark(event.target);
        console.log(gameResult());
      });
    }
  };
  return { gameResult, setButtonsListeners };
})();

gameLogic.setButtonsListeners();
