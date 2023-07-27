import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  Pressable,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {TextElement} from '../components/Reusable/TextElement';
import EStyleSheet from 'react-native-extended-stylesheet';
import {initPalette} from '../services/initApp/initApp';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {themes} from './themes';
import {ButtonElement} from '../components/Reusable/ButtonElement';

const displayOnlyBoard = [
  [2, 4, 8, 16],
  [32, 64, 128, 256],
  [512, 1024, 2048, 4096],
  [8192, 16384, 32768, 0],
];
// const directions = ['right', 'left', 'up', 'down'];

const MAX_AUTO_STEPS = 1200;

const detectTakenIndexes = board => {
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

const GameBoard = () => {
  const [theme, setTheme] = useState('classic');
  const [displayThemes, setDisplayThemes] = useState(false);
  const colors = themes[theme];

  const WINNING_SCORE = +Object.keys(colors)[10]; //2048

  const [autogame, setAutogame] = useState(false); // 0 to activate, false to deactivate. max is MAX_AUTO_STEPS
  const [isGameOver, setIsGameOver] = useState(false);

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
  //this will play random first steps if autogame is set to 0
  // useEffect(() => {
  //   if (autogame === false) return;
  //   if (autogame === 0) {
  //     const initialBoard = initializeBoard();
  //     addRandomTile(initialBoard);
  //     addRandomTile(initialBoard);
  //     setBoard(initialBoard);
  //     setIsPlaying(true);
  //   }
  //   if (autogame === MAX_AUTO_STEPS || isGameOver) return;
  //   setTimeout(() => {
  //     setAutogame(prev => prev + 1);
  //     handleSwipe(directions[Math.floor(Math.random() * directions.length)]);
  //   }, 50);
  // }, [autogame]);

  const initializeBoard = () => {
    const initialBoard = Array(4)
      .fill([])
      .map((row, rowIndex) =>
        Array(4)
          .fill(0)
          .map((cell, cellIndex) => {
            return {
              value: 0,
              index: null,
            };
          }),
      );
    addRandomTile(initialBoard);
    addRandomTile(initialBoard);
    setBoard(initialBoard);
    setScore(0);
    setIsWin(false);
    setIsGameOver(false);
    const boardInstance = {
      board: initialBoard,
      score: 0,
      didLose: false,
      direction: null,
    };
    setHistory([boardInstance]);
    historyRef.current = [boardInstance];
    return initialBoard;
  };

  const checkForEmptyTiles = board => {
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

  const counter = useRef(0);

  const addRandomTile = board => {
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
      const didLose = checkLose(newBoard);
      const nextHistory = [
        ...historyRef.current,
        {board: newBoard, score: score + addedValue, didLose, direction},
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
        if (board[i][j].value === WINNING_SCORE) {
          return true;
        }
      }
    }

    return false;
  };

  const checkLose = board => {
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
          <TextElement customStyle={styles.winText}>{t('win')}</TextElement>
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
        setIsGameOver(history[history.length - 2].didLose);
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
        setIsGameOver(historyRef.current[history.length].didLose);
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

  const mergeTiles = board => {
    const newBoard = JSON.parse(JSON.stringify(board));
    let addedScore = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        if (newBoard[i][j].value === newBoard[i][j - 1].value) {
          newBoard[i][j].value *= 2;
          addedScore += newBoard[i][j].value;
          newBoard[i][j].value === WINNING_SCORE && setIsWin(true);
          newBoard[i][j - 1].value = 0;
          newBoard[i][j - 1].index = null;
        }
      }
    }
    increaseScore(addedScore);
    return [newBoard, addedScore];
  };

  const isEqual = (board1, board2) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board1[i][j].value !== board2[i][j].value) {
          return false;
        }
      }
    }
    return true;
  };

  const [focusOnTheme, setFocusOnTheme] = useState();

  const renderBoard = () => {
    return (
      <View style={styles.board}>
        {isPlaying ? (
          <>
            {board.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, columnIndex) => {
                  const cellValue =
                    cell.value !== 0 ? cell.value.toString() : '';
                  const cellIndex =
                    cell.index !== null ? cell.index?.toString() : '';
                  const backgroundColor =
                    colors[cellValue]?.background || colors.undefined;
                  const textColor = colors[cellValue]?.text || colors.undefined;

                  return (
                    <Tile
                      key={cellIndex || columnIndex + ':' + rowIndex}
                      value={cellValue}
                      backgroundColor={backgroundColor}
                      textColor={textColor}
                      cellIndex={cellIndex}
                      coords={{rowIndex, columnIndex}}
                    />
                  );
                })}
              </View>
            ))}
            {
              <View
                style={{
                  position: 'absolute',
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  opacity: isGameOver ? 0.5 : 0,
                  backgroundColor: 'blue',
                }}>
                <TextElement changeFontByRem={1.5}>
                  Give it another go!
                </TextElement>
              </View>
            }
          </>
        ) : (
          <>
            {displayOnlyBoard.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, columnIndex) => {
                  const cellValue = cell !== 0 ? cell.toString() : '';
                  const backgroundColor =
                    colors[cellValue]?.background || colors.undefined;
                  const textColor = colors[cellValue]?.text || colors.undefined;

                  return (
                    <Tile
                      key={columnIndex}
                      value={cellValue}
                      backgroundColor={backgroundColor}
                      textColor={textColor}
                      displayOnlyBoard
                      coords={{rowIndex, columnIndex}}
                    />
                  );
                })}
              </View>
            ))}
            <Pressable
              onPress={() => setDisplayThemes(prev => !prev)}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focusOnTheme ? '#ffffff80' : '#fffffff0',
              }}>
              <TextElement changeFontByRem={2} customStyle={{color: '#000000'}}>
                2048
              </TextElement>
              {displayThemes && (
                <>
                  <TextElement
                    changeFontByRem={0.2}
                    customStyle={{
                      color: focusOnTheme ? '#00000000' : '#000000',
                      alignSelf: 'flex-start',
                      paddingHorizontal: 10,
                    }}>
                    {t('theme')}
                  </TextElement>
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      // opacity: focusOnTheme ? 0.2 : 1,
                    }}>
                    {Object.entries(themes).map(
                      ([themeName, thisTheme], index) => (
                        <ButtonElement
                          key={themeName}
                          onLongPress={() => setFocusOnTheme(prev => !prev)}
                          customStyle={{
                            width: undefined,
                            height: 40,
                            backgroundColor: focusOnTheme
                              ? themeName === theme
                                ? thisTheme[256].background
                                : thisTheme[256].background + '80'
                              : thisTheme[256].background,
                            color: focusOnTheme
                              ? themeName === theme
                                ? thisTheme[256].text
                                : 'transparent'
                              : thisTheme[256].text,
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            borderColor:
                              themeName === theme
                                ? thisTheme[512].background
                                : thisTheme[256].background,
                          }}
                          title={themeName.toUpperCase()}
                          onPress={() => setTheme(themeName)}
                        />
                      ),
                    )}
                  </View>
                </>
              )}
            </Pressable>
          </>
        )}
      </View>
    );
  };

  const Tile = ({
    value,
    backgroundColor,
    textColor,
    displayOnlyBoard,
    cellIndex,
    coords,
  }) => {
    return (
      <Animated.View
        entering={cellIndex == counter.current && ZoomIn.delay(100)}
        style={[styles.cell, {backgroundColor}]}>
        <TextElement
          changeFontByRem={-0.1}
          customStyle={{
            ...styles.cellText,
            color: textColor ? textColor : '#776E65',
          }}>
          {displayOnlyBoard ? (focusOnTheme ? '' : value) : value}
        </TextElement>
      </Animated.View>
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

        <View style={{overflow: 'hidden'}}>{renderBoard()}</View>

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
