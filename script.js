document.addEventListener('DOMContentLoaded', function() {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let cellElements = document.querySelectorAll('.cell');
    let board = document.getElementById('board');
    let winningMessageElement = document.getElementById('winningMessage');
    let restartButton = document.getElementById('restartButton');
    let winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    let circleTurn;
    let playerXInput = document.getElementById('playerXInput');
    let playerOInput = document.getElementById('playerOInput');
    let startButton = document.getElementById('startButton');
    let inputWrapper = document.getElementById('inputWrapper');

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    function startGame() {
        circleTurn = false;
        playerXName = playerXInput.value || "Player X";
        playerOName = playerOInput.value || "Player O";

        inputWrapper.classList.add('hidden'); // Hide input container

        board.classList.remove('player-x', 'player-o');
        winningMessageElement.classList.remove('show');

        cellElements.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'circle', 'clicked', 'player-x', 'player-o');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });

        setBoardHoverClass();
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = circleTurn ? 'circle' : 'x';
        const currentPlayer = circleTurn ? playerOName : playerXName;
        placeMark(cell, currentClass, currentPlayer);
        cell.classList.add('clicked');
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }

    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = 'Draw!';
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? playerOName : playerXName} Wins!`;
        }
        winningMessageElement.classList.add('show');
    }
    

    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.textContent === playerXName || cell.textContent === playerOName;
        });
    }

    function placeMark(cell, currentClass, currentPlayer) {
        cell.textContent = currentClass;
        cell.classList.add(currentClass, 'player-' + (currentPlayer === playerXName ? 'x' : 'o'));
    }

    function swapTurns() {
        circleTurn = !circleTurn;
    }

    function setBoardHoverClass() {
        board.classList.remove('x', 'circle');
        if (circleTurn) {
            board.classList.add('circle');
        } else {
            board.classList.add('x');
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    }
});
