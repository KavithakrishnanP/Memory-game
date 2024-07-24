const emojis = [
    "🤩", "🤩",
    "😎", "😎",
    "😂", "😂",
    "🤑", "🤑",
    "😭", "😭",
    "🥳", "🥳",
    "😵", "😵",
    "🤐", "🤐"
  ];
  
  // Fisher-Yates Shuffle Algorithm
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  let shuf_emojis = shuffle(emojis.slice());
  
  let firstClick = null;
  let secondClick = null;
  let matchedPairs = 0;
  
  function handleClick(event) {
    const box = event.target;
  
    if (
      !box.classList.contains("item") ||
      box.classList.contains("boxOpen") ||
      box.classList.contains("boxMatch")
    ) {
      return;
    }
  
    box.classList.add("boxOpen");
    box.innerHTML = shuf_emojis[box.dataset.index];
  
    if (!firstClick) {
      firstClick = box;
    } else {
      secondClick = box;
  
      if (firstClick.innerHTML === secondClick.innerHTML) {
        firstClick.classList.add("boxMatch");
        secondClick.classList.add("boxMatch");
        matchedPairs += 1;
        firstClick = null;
        secondClick = null;
        checkWin();
      } else {
        setTimeout(() => {
          firstClick.classList.remove("boxOpen");
          secondClick.classList.remove("boxOpen");
          firstClick.innerHTML = "";
          secondClick.innerHTML = "";
          firstClick = null;
          secondClick = null;
        }, 500);
      }
    }
  }
  
  function checkWin() {
    if (matchedPairs === emojis.length / 2) {
      setTimeout(() => alert("You win!"), 300);
    }
  }
  
  function createBoard() {
    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = ''; // Clear any existing content
  
    shuf_emojis.forEach((emoji, index) => {
      const box = document.createElement("div");
      box.className = "item";
      box.dataset.index = index;
      box.addEventListener("click", handleClick);
      gameContainer.appendChild(box);
    });
  }
  
  function resetGame() {
    matchedPairs = 0;
    firstClick = null;
    secondClick = null;
    shuf_emojis = shuffle(emojis.slice());
    createBoard();
  }
  
  // Initialize the game board
  createBoard();
  
  // Add event listener to reset button
  document.querySelector('.reset').addEventListener('click', resetGame);
  