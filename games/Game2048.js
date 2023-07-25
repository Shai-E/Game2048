import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {TextElement} from '../components/Reusable/TextElement';
import EStyleSheet from 'react-native-extended-stylesheet';
import {initPalette} from '../services/initApp/initApp';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const colors = {
  2: '#EEE4DA',
  4: '#EDE0C8',
  8: '#F2B179',
  16: '#F59563',
  32: '#F67C5F',
  64: '#F65E3B',
  128: '#EDCF72',
  256: '#EDCC61',
  512: '#EDC850',
  1024: '#EDC53F',
  2048: '#EDC22E',
  4096: 'red',
  8192: 'red',
  16384: 'red',
  32768: 'red',
};

const WINNING_SCORE = +Object.keys(colors)[2]; //2048

const GameBoard = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState([]);
  const historyRef = useRef([]);
  const {t} = useTranslation();

  useFocusEffect(
    useCallback(() => {
      initPalette();
      initializeBoard();
    }, []),
  );

  const initializeBoard = () => {
    const initialBoard = Array(4)
      .fill(0)
      .map(() => Array(4).fill(0));
    addRandomTile(initialBoard);
    addRandomTile(initialBoard);
    setBoard(initialBoard);
    setScore(0);
    setIsWin(false);
    const boardInstance = {board: initialBoard, score: 0};
    setHistory([boardInstance]);
    historyRef.current = [boardInstance];
  };

  const addRandomTile = board => {
    const emptyTiles = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyTiles.push({x: i, y: j});
        }
      }
    }

    if (emptyTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyTiles.length);
      const tile = emptyTiles[randomIndex];
      board[tile.x][tile.y] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const isRtl = I18nManager.getConstants().isRTL;

  const handleSwipe = direction => {
    if (!isPlaying) return;
    let newBoard = [...board];
    let addedValue = 0;
    switch (direction) {
      case 'down': {
        newBoard = transposeBoard(newBoard);
        newBoard = moveTiles(newBoard);
        const [a, b] = mergeTiles(newBoard);
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
        const [a, b] = mergeTiles(newBoard);
        newBoard = a;
        addedValue = b;
        newBoard = moveTiles(newBoard);
        newBoard = reverseRows(newBoard);
        newBoard = transposeBoard(newBoard);
        break;
      }
      case isRtl ? 'left' : 'right': {
        newBoard = moveTiles(newBoard);
        const [a, b] = mergeTiles(newBoard);
        newBoard = a;
        addedValue = b;
        newBoard = moveTiles(newBoard);
        break;
      }
      case isRtl ? 'right' : 'left': {
        newBoard = reverseRows(newBoard);
        newBoard = moveTiles(newBoard);
        const [a, b] = mergeTiles(newBoard);
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
      addRandomTile(newBoard);
      setBoard(newBoard);

      const nextHistory = [
        ...history,
        {board: newBoard, score: score + addedValue},
      ];
      historyRef.current = nextHistory;
      setHistory(prevHistory => {
        return nextHistory;
      });
    }
  };

  const increaseScore = addedValue => {
    setScore(prevScore => prevScore + addedValue);
  };

  const checkWinCondition = board => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === WINNING_SCORE) {
          return true;
        }
      }
    }

    return false;
  };

  const ScoreView = () => {
    return (
      <View style={styles.scoreView}>
        <View>
          <TextElement customStyle={styles.scoreText}>
            {t('score')}: {score}
          </TextElement>
          <TextElement customStyle={styles.movesText} changeFontByRem={-0.2}>
            {t('moves')}: {history?.length - 1}
          </TextElement>
        </View>
        {isWin && (
          <TextElement customStyle={styles.winText}>You Win!</TextElement>
        )}
      </View>
    );
  };

  const RestartButton = () => {
    const handleRestart = () => {
      initializeBoard();
    };

    return (
      <TouchableOpacity
        style={[styles.gameButton, {minWidth: widthPercentageToDP('33.33%')}]}
        onPress={handleRestart}>
        <Text style={styles.gameButtonText}>Restart</Text>
      </TouchableOpacity>
    );
  };
  const StartButton = () => {
    const handleRestart = () => {
      setIsPlaying(true);
      initializeBoard();
    };

    return (
      <TouchableOpacity
        style={[styles.gameButton, {minWidth: widthPercentageToDP('33.33%')}]}
        onPress={handleRestart}>
        <Text style={styles.gameButtonText}>Start</Text>
      </TouchableOpacity>
    );
  };

  const UndoButton = ({disabled}) => {
    const handleUndo = () => {
      if (!isPlaying) return;
      if (history.length > 1) {
        const prevBoard = history[history.length - 2].board;
        const prevScore = history[history.length - 2].score;
        setScore(prevScore);
        setBoard(prevBoard);
        setHistory(prevHistory => prevHistory.slice(0, -1));
        setIsWin(checkWinCondition(prevBoard));
      }
    };

    return (
      <TouchableOpacity
        style={[styles.gameButton, {opacity: disabled ? 0.3 : 1}]}
        onPress={disabled ? null : handleUndo}>
        <Text style={styles.gameButtonText}>Undo</Text>
      </TouchableOpacity>
    );
  };

  const RedoButton = ({disabled}) => {
    const handleRedo = () => {
      if (!isPlaying) return;
      if (history.length > 0 && historyRef.current.length > history.length) {
        const nextBoard = historyRef.current[history.length].board;
        const nextScore = historyRef.current[history.length].score;
        setBoard(nextBoard);
        setScore(nextScore);
        setHistory(prevHistory => {
          return [...historyRef.current].slice(
            0,
            history.length - historyRef.current.length + 1 ||
              historyRef.current.length,
          );
        });
        if (checkWinCondition(nextBoard)) {
          setIsWin(true);
        }
      }
    };

    return (
      <TouchableOpacity
        style={[styles.gameButton, {opacity: disabled ? 0.3 : 1}]}
        onPress={disabled ? null : handleRedo}>
        <Text style={styles.gameButtonText}>Redo</Text>
      </TouchableOpacity>
    );
  };

  const transposeBoard = board => {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  };

  const reverseRows = board => {
    return board.map(row => row.slice().reverse());
  };

  const moveTiles = board => {
    const newBoard = [...board];
    for (let i = 0; i < 4; i++) {
      newBoard[i] = moveRow(newBoard[i]);
    }
    return newBoard;
  };

  const moveRow = row => {
    let newRow = row.filter(val => val !== 0);
    const zerosCount = 4 - newRow.length;
    newRow = Array(zerosCount).fill(0).concat(newRow);
    return newRow;
  };

  const mergeTiles = board => {
    const newBoard = [...board];
    let addedScore = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        if (newBoard[i][j] === newBoard[i][j - 1]) {
          newBoard[i][j] *= 2;
          addedScore += newBoard[i][j];
          newBoard[i][j] === WINNING_SCORE && setIsWin(true);
          newBoard[i][j - 1] = 0;
        }
      }
    }
    increaseScore(addedScore);
    return [newBoard, addedScore];
  };

  const isEqual = (board1, board2) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board1[i][j] !== board2[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const renderBoard = () => {
    return (
      <View style={styles.board}>
        {isPlaying ? (
          board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => {
                const cellValue = cell !== 0 ? cell.toString() : '';
                const backgroundColor = colors[cellValue] || colors.undefined;

                return (
                  <Tile
                    key={columnIndex}
                    value={cellValue}
                    backgroundColor={backgroundColor}
                  />
                );
              })}
            </View>
          ))
        ) : (
          <TextElement changeFontByRem={2}>2048</TextElement>
        )}
      </View>
    );
  };

  const Tile = ({value, backgroundColor}) => {
    return (
      <View style={[styles.cell, {backgroundColor}]}>
        <Text style={styles.cellText}>{value}</Text>
      </View>
    );
  };

  const onGestureEvent = event => {
    if (event.nativeEvent.state !== 5) return;
    if (
      event.nativeEvent.translationX > 0 &&
      Math.abs(event.nativeEvent.translationX) >
        Math.abs(event.nativeEvent.translationY)
    ) {
      // Swipe right
      handleSwipe('right');
      // Perform actions for swipe right
    } else if (
      event.nativeEvent.translationX < 0 &&
      Math.abs(event.nativeEvent.translationX) >
        Math.abs(event.nativeEvent.translationY)
    ) {
      // Swipe left
      handleSwipe('left');
      // Perform actions for swipe left
    } else if (
      event.nativeEvent.translationY > 0 &&
      Math.abs(event.nativeEvent.translationY) >
        Math.abs(event.nativeEvent.translationX)
    ) {
      // Swipe down
      handleSwipe('down');
    } else if (
      event.nativeEvent.translationY < 0 &&
      Math.abs(event.nativeEvent.translationY) >
        Math.abs(event.nativeEvent.translationX)
    ) {
      // Swipe up
      handleSwipe('up');
    }
  };

  const styles = EStyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '$background',
    },
    board: {
      borderWidth: 5,
      borderColor: '#BBADA0',
      backgroundColor: '$fillSecondary',
      width: widthPercentageToDP('80%') + 50,
      height: widthPercentageToDP('80%') + 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: widthPercentageToDP('20%'),
      height: widthPercentageToDP('20%'),
      margin: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cellText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#776E65',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    button: {
      margin: 10,
      padding: 10,
      backgroundColor: '#BBADA0',
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    scoreView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      width: '100%',
      paddingHorizontal: '1.5rem',
      color: '$primaryText',
    },
    scoreText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    winText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'green',
    },
    gameButton: {
      alignSelf: 'flex-start',
      marginTop: 10,
      padding: 10,
      backgroundColor: '$fillPrimary',
      borderRadius: 5,
      alignItems: 'center',
    },
    gameButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '$primaryText',
    },
  });

  return (
    <PanGestureHandler onHandlerStateChange={onGestureEvent}>
      <View style={styles.container}>
        <ScoreView />

        <View style={{}}>{renderBoard()}</View>

        <View
          style={{flexDirection: 'row', gap: 10, justifyContent: 'center'}}
          isPlaying={isPlaying}>
          <RedoButton
            disabled={history.length >= historyRef.current.length}
            isPlaying={isPlaying}
          />
          {isPlaying ? <RestartButton /> : <StartButton />}
          <UndoButton disabled={history.length <= 1} isPlaying={isPlaying} />
        </View>
      </View>
    </PanGestureHandler>
  );
};

export default GameBoard;
