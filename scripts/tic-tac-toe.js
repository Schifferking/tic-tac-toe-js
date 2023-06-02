const gameBoard = (() => {
  let _board = new Array(9).fill('');
  const getBoard = () => _board;
  const placeMark = (index, mark) => _board[index] = mark;
  const _getRows = () => {
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
  const resetBoard = () => _board = new Array(9).fill('');
  return { getBoard, getLines, isNotBoardFull, placeMark, resetBoard };
})();

const playerFactory = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return { getName, getMark };
};

const displayController = (() => {
  const _h2 = document.querySelector("h2");
  const updateH2 = (text) => _h2.textContent = text;
  return { updateH2 };
})();

const gameLogic = (() => {
  const _startButton = document.querySelector("#start-game");
  const _buttons = document.querySelectorAll(".board-container > div > button");
  const _form = document.querySelector("[name='players']");
  let _firstPlayer = {}; 
  let _secondPlayer = {};
  let _currentPlayer = {};
  let _gameStart = false;
  let _buttonsSet = false;
  const _disableButtons = () => {
    for (let button of _buttons)
      button.disabled = true;
  };
  const _activateButtons = () => {
    for (let button of _buttons)
      button.disabled = false;
  };
  const _resetButtons = () => {
    for (let button of _buttons)
      button.textContent = '';
  };
  const _createPlayers = () => {
    _form.addEventListener("submit", function(event) {
      const firstPlayerName = event.currentTarget.querySelector("[name='ttt-first-player-name']").value;
      const secondPlayerName = event.currentTarget.querySelector("[name='ttt-second-player-name']").value;
      _firstPlayer = playerFactory(firstPlayerName, 'X');
      _secondPlayer = playerFactory(secondPlayerName, 'O');
      _currentPlayer = _firstPlayer;
      if (Object.keys(_firstPlayer).length > 0)
        _startButton.disabled = false;
      event.preventDefault();
    });
  };
  const _updateCurrentPlayer = () => {
    _currentPlayer = _currentPlayer === _firstPlayer ? _secondPlayer : _firstPlayer;
  };
  const _isGameVictory = (line, mark) => {
    return JSON.stringify(line) === JSON.stringify(new Array(3).fill(mark)) ? true : false;
  };
  const _gameResult = () => {
    for (let line of gameBoard.getLines()) {
      if (_isGameVictory(line, _currentPlayer.getMark()))
        return `${_currentPlayer.getName()} won the game, congratulations`;
    }
    if (gameBoard.isNotBoardFull() === false)
      return 'Draw';
  };
  const _addColorMark = (button) => {
    if (_currentPlayer === _firstPlayer)
      button.classList.add("x-mark");
    else
      button.classList.add("o-mark");
  };
  const _placeMark = (button) => {
    if (button.textContent === '') {
      index = Number(button.getAttribute("data-index"));
      mark = _currentPlayer.getMark();
      gameBoard.placeMark(index, mark);
      button.textContent = mark;
      _addColorMark(button);
    } else return;
  };
  const _startNewRound = () => {
    _updateCurrentPlayer();
    displayController.updateH2(`${_currentPlayer.getName()}'s turn`);
  };
  const _setButtonsListeners = () => {
    for (let button of _buttons) {
      button.addEventListener("click", function(event){
        _placeMark(event.target);
        let result = _gameResult();
        event.target.disabled = true;
        if (result) {
          displayController.updateH2(result);
          _disableButtons();
          return;
        }
        _startNewRound();
      });
    }
  };
  const _restartGame = () => {
    _startButton.disabled = true;
    _gameStart = false;
    _firstPlayer = {};
    _secondPlayer = {};
    _currentPlayer = {};
    _resetButtons();
    _disableButtons();
    gameBoard.resetBoard();
  };
  const startGame = () => {
    _disableButtons();
    _createPlayers();
    _startButton.disabled = true;
    _startButton.addEventListener("click", function(event) {
      if (_gameStart === false) {
        _gameStart = true;
        _activateButtons();
        // prevent duplicate event listeners
        if (_buttonsSet === false) {
          _setButtonsListeners();
          _buttonsSet = true;
        }
        displayController.updateH2(`${_currentPlayer.getName()}'s turn`);
      } else _restartGame();
    });
  };
  return { startGame };
})();

gameLogic.startGame();
