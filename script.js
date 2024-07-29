document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const info = document.querySelector('.info');
  const resetButton = document.getElementById('reset');
  
  let currentPlayer = 'X';
  let gameBoard = Array(9).fill(null);
  let gameActive = true;

  const backgroundMusic = document.getElementById('background-music');
  const winSound = document.getElementById('win-sound');
  const tieSound = document.getElementById('tie-sound');

  backgroundMusic.play();

  boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(box, index));
  });

  function handleBoxClick(box, index) {
    if (!gameActive || gameBoard[index]) return;
    
    box.querySelector('.boxText').textContent = currentPlayer;
    gameBoard[index] = currentPlayer;

    if (checkWin()) {
      winSound.play(); 
      backgroundMusic.pause(); 
      backgroundMusic.currentTime = 0; 
      info.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;

      setTimeout(() => {
        winSound.pause();
        winSound.currentTime = 0;
      }, 100); 

      alert(`Player ${currentPlayer} wins! Press OK to continue.`);
    } else if (gameBoard.every(cell => cell)) {
      tieSound.play(); 
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0; 
      info.textContent = "It's a tie!";
      gameActive = false;

      setTimeout(() => {
        tieSound.pause();
        tieSound.currentTime = 0;
      }, 100);

      alert("It's a tie! Press OK to continue.");
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      info.textContent = `Turn for ${currentPlayer}`;
    }
  }

  function checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6] 
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
  }

  resetButton.addEventListener('click', () => {
    gameBoard = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    info.textContent = "Click on any boxes to start the game";
    boxes.forEach(box => {
      box.querySelector('.boxText').textContent = '';
    });

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
  });
});
