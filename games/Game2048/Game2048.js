import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {TextElement} from '../../components/Reusable/TextElement';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {themes} from './themes';
import {PauseIcon, PlayIcon, SaveIcon} from '../../assets/icons/appIcons';
import GameArea from './GameArea';

import {
  addRandomTile,
  handleSwipe,
  saveGame,
  checkWinCondition,
  checkLose,
  onGestureEvent,
  formatTime,
} from './gameUtils';
import PressableIcon from '../../components/Reusable/PressableIcon';
import GameButton from './GameButton';
import useTimeCount from './useCountUp';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveGame} from '../../store/reducers/game2048Slice';
import {useColors} from '../../services/customHook/useColors';
import {
  clearStorage,
  getFromStorage,
  saveToStorage,
} from '../../services/utils/storage/setAsyncStorage';
const directions = ['right', 'left', 'up', 'down'];

const MAX_AUTO_STEPS = 1200;

const GameBoard = () => {
  const DEFAULT_THEME = 'classic';
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const colors = themes[theme];

  const WINNING_SCORE = +Object.keys(colors)[10]; //2048

  const [autogame, setAutogame] = useState(0); // 0 to activate, false to deactivate. max is MAX_AUTO_STEPS
  const [isGameOver, setIsGameOver] = useState(false);

  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState([]);
  const [gameId, setGameId] = useState(null);
  // const [initTimer, initTimer.current = = useState(0);
  const initTimer = useRef(0);
  const historyRef = useRef([]);
  const {t} = useTranslation();
  const counter = useRef(0);

  const activeGame = useSelector(state => state.game2048Slice.activeGame);
  const isDarkMode = useSelector(state => state.appSlice.isDarkMode);
  // console.log(activeGame);
  // console.log(activeGame, 'if exists, use as default and clean up right after');

  const dispatch = useDispatch();
  const {background, fillPrimary, primaryText} = useColors();

  const [timeCountUp, restartCount, pauseTimer, toggleCount, countState] =
    useTimeCount({
      souldCount: isPlaying && !isGameOver,
      initTimer: initTimer.current,
    });
  useEffect(() => {
    (async () => {
      const current = await getFromStorage('Current');
      if (current) {
        const lastBoard = current[current.length - 1];
        setBoard(lastBoard.board);
        setScore(lastBoard.score);
        setHistory(current);
        historyRef.current = current;
        setIsPlaying(true);
        setGameId(lastBoard.date);
        // console.log(lastBoard.timeCountUp, 'before set');
        if (lastBoard.timeCountUp) {
          initTimer.current = +lastBoard.timeCountUp;
          restartCount(+lastBoard.timeCountUp);
        }
      } else {
        initializeBoard();
      }
    })();
    // if (activeGame) {
    //   // setIsPlaying(true);
    //   const lastBoard =
    //     activeGame.gameHistory[activeGame.gameHistory.length - 1];
    //   setBoard(lastBoard.board);
    //   setScore(lastBoard.score);
    //   setHistory(activeGame.gameHistory);
    //   historyRef.current = activeGame.gameHistory;
    //   setIsPlaying(true);
    //   setGameId(activeGame.date);
    //   // console.log(lastBoard.timeCountUp, 'before set');
    //   if (lastBoard.timeCountUp) {
    //     initTimer.current = +lastBoard.timeCountUp;
    //     restartCount(+lastBoard.timeCountUp);
    //   }
    //   // console.log(
    //   //   Object.keys(
    //   //     activeGame.gameHistory[activeGame.gameHistory.length - 1],
    //   //   ),
    //   //   '["board", "score", "didLose", "direction", timeCountUp]',
    //   // );
    // }

    //this will play random first steps if autogame is set to 0
    if (autogame !== false) {
      // if (autogame === 0) {
      //   const initialBoard = initializeBoard();
      //   addRandomTile(initialBoard, setBoard, counter);
      //   addRandomTile(initialBoard, setBoard, counter);
      //   setBoard(initialBoard);
      //   setIsPlaying(true);
      // }
      // if (autogame === MAX_AUTO_STEPS || isGameOver) return;
      // setTimeout(() => {
      //   setAutogame(prev => prev + 1);
      //   handleSwipe(directions[Math.floor(Math.random() * directions.length)]);
      // }, 50);
    }
  }, [activeGame, autogame, initTimer.current, isDarkMode, isGameOver]);

  const handleSaveGame = () => saveGame(historyRef, player, gameId);

  useEffect(() => {
    !isPlaying && countState && dispatch(setActiveGame(null));
  }, [isPlaying, countState]);

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
    addRandomTile(initialBoard, setBoard, counter);
    addRandomTile(initialBoard, setBoard, counter);
    setScore(0);
    setIsWin(false);
    setIsGameOver(false);
    const boardInstance = {
      board: initialBoard,
      score: 0,
      didLose: false,
      direction: null,
      timeCountUp: 0,
    };
    setHistory([boardInstance]);
    historyRef.current = [boardInstance];
    return initialBoard;
  };

  const increaseScore = (addedValue, setScore) => {
    setScore(prevScore => prevScore + addedValue);
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isPlaying && !isGameOver && (
            <TextElement>{formatTime(timeCountUp)}</TextElement>
          )}
        </View>
      </View>
    );
  };

  // const GameButton = ({onPress, title, customStyle}) => {
  //   return (
  //     <ButtonElement
  //       preventDefaultStyle
  //       customStyle={{
  //         ...styles.gameButton,
  //         ...styles.gameButtonText,
  //         color: EStyleSheet.value('$primaryText'),
  //         ...customStyle,
  //       }}
  //       onPress={onPress}
  //       title={title}
  //     />
  //   );
  // };

  const handleRestart = () => {
    setIsGameOver(true);
    initializeBoard();
    dispatch(setActiveGame(null));
    setGameId(Date.now());
    clearStorage(['Current']);
    setIsPlaying(false);
  };
  const RestartButton = ({handleRestart}) => {
    return (
      <GameButton
        customStyle={{
          minWidth: widthPercentageToDP('30%'),
          background: fillPrimary,
        }}
        onPress={handleRestart}
        title={t('restart')}
      />
    );
  };
  const handleStart = () => {
    setIsPlaying(true);
    restartCount();
    initTimer.current = 0;
    toggleCount(true);
    initializeBoard();
  };

  const StartButton = ({handleStart}) => {
    return (
      <GameButton
        customStyle={{
          minWidth: widthPercentageToDP('30%'),
          background: fillPrimary,
        }}
        onPress={handleStart}
        title={t('start')}
      />
    );
  };

  const handleUndo = () => {
    if (!isPlaying) return;
    if (history.length > 1) {
      const prevBoard = history[history.length - 2].board;
      const prevScore = history[history.length - 2].score;
      setScore(prevScore);
      setBoard(prevBoard);
      setIsGameOver(history[history.length - 2].didLose);
      setHistory(prevHistory => prevHistory.slice(0, -1));
      setIsWin(checkWinCondition(prevBoard, WINNING_SCORE));
    }
  };
  const UndoButton = ({disabled, handleUndo}) => {
    return (
      <GameButton
        customStyle={{
          opacity: disabled ? 0.3 : 1,
          background: fillPrimary,
        }}
        onPress={disabled ? null : handleUndo}
        title={t('undo')}
      />
    );
  };

  const handleWin = () => {
    setIsWin(true);
    // pauseTimer();
  };

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
      if (checkWinCondition(nextBoard, WINNING_SCORE)) {
        handleWin();
      }
    }
  };
  const RedoButton = ({disabled, handleRedo}) => {
    return (
      <GameButton
        customStyle={{
          opacity: disabled ? 0.3 : 1,
          background: fillPrimary,
        }}
        onPress={disabled ? null : handleRedo}
        title={t('redo')}
      />
    );
  };

  const SaveButton = ({disabled, historyRef, player}) => {
    return (
      <PressableIcon
        customStyle={[styles.gameButton, {opacity: disabled ? 0.3 : 1}]}
        onPress={disabled ? null : handleSaveGame}
        Icon={SaveIcon}
        iconColor={EStyleSheet.value('$primaryText')}
      />
    );
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    isPlaying && toggleCount && toggleCount(isFocused);
  }, [toggleCount, isFocused, isPlaying]);

  const PauseButton = ({disabled, historyRef, player}) => {
    return (
      <PressableIcon
        customStyle={[
          styles.gameButton,
          {opacity: disabled ? 0.3 : 1, backgroundColor: fillPrimary},
        ]}
        onPress={disabled ? null : () => toggleCount(!countState)}
        Icon={countState ? PauseIcon : PlayIcon}
        iconColor={primaryText}
      />
    );
  };

  const [player, setPlayer] = useState('John');

  const handleSwipeByDirection = direction => {
    if (direction) {
      handleSwipe(
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
      );
    }
  };

  const GameController = ({isPlaying, history, historyRef, player}) => {
    return (
      <View
        style={{flexDirection: 'row', gap: 10, justifyContent: 'center'}}
        isPlaying={isPlaying}>
        <PauseButton disabled={!isPlaying} />
        <RedoButton
          disabled={history.length >= historyRef.current.length}
          handleRedo={handleRedo}
        />
        {isPlaying ? (
          <RestartButton handleRestart={handleRestart} />
        ) : (
          <StartButton handleStart={handleStart} />
        )}
        <UndoButton disabled={history.length <= 1} handleUndo={handleUndo} />
        {/* <SaveButton
          historyRef={historyRef}
          player={player}
          disabled={historyRef.current?.length < 2}
        /> */}
      </View>
    );
  };

  return (
    <PanGestureHandler
      onHandlerStateChange={event =>
        countState ? onGestureEvent(event, handleSwipeByDirection) : null
      }>
      <View style={[styles.container, {backgroundColor: background}]}>
        <TextElement customStyle={{...styles.winText, opacity: isWin ? 1 : 0}}>
          {t('win')}
        </TextElement>

        <ScoreView />
        <View style={{overflow: 'hidden'}}>
          <GameArea
            counter={counter.current}
            board={board}
            isPlaying={isPlaying}
            colors={colors}
            isGameOver={isGameOver}
            player={player}
            setPlayer={setPlayer}
            setTheme={setTheme}
            theme={theme}
            saveGame={handleSaveGame}
            prevBoard={history[history.length - 2]}
            setBoard={setBoard}
            historyRef={historyRef}
            setHistory={setHistory}
            history={history}
          />
        </View>

        <GameController
          isPlaying={isPlaying}
          history={history}
          historyRef={historyRef}
          player={player}
        />
      </View>
    </PanGestureHandler>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$background',
  },
  scoreView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    height: heightPercentageToDP('10%'),
    alignItems: 'center',
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
    marginRight: 10,
  },
  gameButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    justifyContent: 'center',
    height: heightPercentageToDP('4%'),
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  // gameButtonText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
});

export default GameBoard;
