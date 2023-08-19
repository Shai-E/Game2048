import {I18nManager} from 'react-native';
import {
  getFromStorage,
  saveToStorage,
} from '../../services/utils/storage/setAsyncStorage';
const isRtl = I18nManager.getConstants().isRTL;

export const detectTakenIndexes = board => {
  const takenIndexes = board.reduce((acc, row) => {
    const cellValues = row
      .filter(cell => cell.value !== 0)
      .map(cell => {
        return cell.index;
      });
    return [...acc, ...cellValues];
  }, []);
  return takenIndexes;
};

export const checkForEmptyTiles = board => {
  const emptyTiles = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j].value === 0) {
        emptyTiles.push({x: i, y: j});
      }
    }
  }

  if (emptyTiles.length > 0) {
    return emptyTiles;
  } else {
    return false;
  }
};

export const addRandomTile = (board, setBoard, counter) => {
  const emptyTiles = checkForEmptyTiles(board);

  if (emptyTiles !== false) {
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const tile = emptyTiles[randomIndex];
    board[tile.x].find((row, index) => index === tile.y).value =
      Math.random() < 0.9 ? 2 : 4;
    while (detectTakenIndexes(board).includes(counter.current + 1)) {
      counter.current++;
    }
    board[tile.x].find((row, index) => index === tile.y).index =
      counter.current + 1;
    counter.current = counter.current < 15 ? counter.current + 1 : 0;
  }
  setBoard(board);
};

export const transposeBoard = board => {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
};

export const reverseRows = board => {
  return board.map(row => row.slice().reverse());
};

export const moveTiles = board => {
  const newBoard = [...board];
  for (let i = 0; i < 4; i++) {
    newBoard[i] = moveRow(newBoard[i]);
  }
  return newBoard;
};

export const moveRow = row => {
  let newRow = row.filter(val => val.value !== 0);
  const zerosCount = 4 - newRow.length;
  newRow = Array(zerosCount)
    .fill(0)
    .map((cell, cellIndex) => {
      return {
        value: 0,
        index: null,
      };
    })
    .concat(newRow);
  return newRow;
};

export const mergeTiles = (
  board,
  increaseScore,
  WINNING_SCORE,
  setScore,
  handleWin,
) => {
  const newBoard = JSON.parse(JSON.stringify(board));
  let addedScore = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j > 0; j--) {
      if (newBoard[i][j].value === newBoard[i][j - 1].value) {
        newBoard[i][j].value *= 2;
        addedScore += newBoard[i][j].value;
        newBoard[i][j].value === WINNING_SCORE && handleWin();
        newBoard[i][j - 1].value = 0;
        newBoard[i][j - 1].index = null;
      }
    }
  }
  increaseScore(addedScore, setScore);
  return [newBoard, addedScore];
};

export const isEqual = (board1, board2) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board1[i][j].value !== board2[i][j].value) {
        return false;
      }
    }
  }
  return true;
};

export const handleSwipe = (
  direction,
  setHistory,
  isPlaying,
  board,
  historyRef,
  increaseScore,
  checkLose,
  setIsGameOver,
  setAutogame,
  counter,
  WINNING_SCORE,
  setScore,
  setBoard,
  history,
  score,
  MAX_AUTO_STEPS,
  handleWin,
  timeCountUp,
  player,
  gameId,
) => {
  if (!isPlaying) return;
  let newBoard = [...board];
  let addedValue = 0;
  switch (direction) {
    case 'down': {
      newBoard = transposeBoard(newBoard);
      newBoard = moveTiles(newBoard);
      const [a, b] = mergeTiles(
        newBoard,
        increaseScore,
        WINNING_SCORE,
        setScore,
        handleWin,
      );
      newBoard = a;
      addedValue = b;
      newBoard = moveTiles(newBoard);
      newBoard = transposeBoard(newBoard);
      break;
    }
    case 'up': {
      newBoard = transposeBoard(newBoard);
      newBoard = reverseRows(newBoard);
      newBoard = moveTiles(newBoard);
      const [a, b] = mergeTiles(
        newBoard,
        increaseScore,
        WINNING_SCORE,
        setScore,
        handleWin,
      );
      newBoard = a;
      addedValue = b;
      newBoard = moveTiles(newBoard);
      newBoard = reverseRows(newBoard);
      newBoard = transposeBoard(newBoard);
      break;
    }
    case isRtl ? 'left' : 'right': {
      newBoard = moveTiles(newBoard);
      const [a, b] = mergeTiles(
        newBoard,
        increaseScore,
        WINNING_SCORE,
        setScore,
        handleWin,
      );
      newBoard = a;
      addedValue = b;
      newBoard = moveTiles(newBoard);
      break;
    }
    case isRtl ? 'right' : 'left': {
      newBoard = reverseRows(newBoard);
      newBoard = moveTiles(newBoard);
      const [a, b] = mergeTiles(
        newBoard,
        increaseScore,
        WINNING_SCORE,
        setScore,
        handleWin,
      );
      newBoard = a;
      addedValue = b;
      newBoard = moveTiles(newBoard);
      newBoard = reverseRows(newBoard);
      break;
    }
    default:
      break;
  }
  if (!isEqual(board, newBoard)) {
    addRandomTile(newBoard, setBoard, counter);
    const didLose = checkLose(newBoard, setIsGameOver, setAutogame);
    const nextHistory = [
      ...history,
      {
        board: newBoard,
        score: score + addedValue,
        didLose,
        direction,
        timeCountUp,
      },
    ];
    historyRef.current = nextHistory;
    setHistory(prevHistory => {
      return nextHistory;
    });
    // saveGame(historyRef, player, gameId);
  }
};

export const saveGame = async (historyRef, player, gameId) => {
  const prevSavedGames = (await getFromStorage('games')) || [];
  let gameInstance = null;
  const existingGame = prevSavedGames.find(game => game.date === gameId);
  if (gameId && existingGame) {
    gameInstance = [
      ...prevSavedGames.filter(game => game.date !== gameId),
      {
        gameHistory: historyRef.current,
        name: player,
        date: gameId,
      },
    ];
  } else if (gameId) {
    console.log(gameId, 'gameId');
    gameInstance = [
      ...prevSavedGames.slice(0, prevSavedGames.length - 1),
      {
        gameHistory: historyRef.current,
        name: player,
        date: gameId,
      },
    ];
  } else {
    gameInstance = [
      ...prevSavedGames,
      {
        gameHistory: historyRef.current,
        name: player,
        date: Date.now(),
      },
    ];
  }

  saveToStorage('games', gameInstance);
};

export const checkWinCondition = (board, WINNING_SCORE) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j].value === WINNING_SCORE) {
        return true;
      }
    }
  }

  return false;
};

export const checkLose = (
  board,
  setIsGameOver,
  setAutogame,
  MAX_AUTO_STEPS,
) => {
  let lose = true;
  const emptyTiles = checkForEmptyTiles(board);
  if (emptyTiles) {
    lose = false;
  } else {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cellValue = board[i][j].value;
        if (
          (i > 0 && board[i - 1][j].value === cellValue) ||
          (i < 3 && board[i + 1][j].value === cellValue) ||
          (j > 0 && board[i][j - 1].value === cellValue) ||
          (j < 3 && board[i][j + 1].value === cellValue)
        ) {
          lose = false;
          break;
        }
      }
      if (!lose) break;
    }
    if (lose) {
      setIsGameOver(true);
      setAutogame(MAX_AUTO_STEPS);
    }
  }
  return lose;
};

export const onGestureEvent = (event, handleSwipeByDirection) => {
  if (event.nativeEvent.state !== 5) return;

  let currentDirection = {
    [event.nativeEvent.translationX > 0 &&
    Math.abs(event.nativeEvent.translationX) >
      Math.abs(event.nativeEvent.translationY)]: 'right',
    [event.nativeEvent.translationX < 0 &&
    Math.abs(event.nativeEvent.translationX) >
      Math.abs(event.nativeEvent.translationY)]: 'left',
    [event.nativeEvent.translationY > 0 &&
    Math.abs(event.nativeEvent.translationY) >
      Math.abs(event.nativeEvent.translationX)]: 'down',
    [event.nativeEvent.translationY < 0 &&
    Math.abs(event.nativeEvent.translationY) >
      Math.abs(event.nativeEvent.translationX)]: 'up',
  }.true;
  handleSwipeByDirection(currentDirection);
};

export const formatTime = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
