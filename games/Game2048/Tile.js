import EStyleSheet from 'react-native-extended-stylesheet';
import Animated, {
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TextElement} from '../../components/Reusable/TextElement';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useEffect, useState} from 'react';
import {Pressable, TouchableOpacity} from 'react-native';
import {addRandomTile} from './gameUtils';

const handleAddVanishedStepToHistory = (
  history,
  newBoard,
  historyRef,
  setHistory,
) => {
  const duplicateBoard = JSON.parse(
    JSON.stringify(history[history.length - 1]),
  );
  const nextHistory = [...history, {...duplicateBoard, board: newBoard}];
  historyRef.current = nextHistory;
  setHistory(prevHistory => {
    return nextHistory;
  });
};

const Tile = ({
  value,
  backgroundColor,
  textColor,
  displayOnlyBoard,
  cellIndex,
  coords,
  counter,
  focusOnTheme,
  prevBoard,
  currBoard,
  setBoard,
  historyRef,
  setHistory,
  history,
}) => {
  const [previousCoords, setPreviousCoords] = useState();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  useEffect(() => {
    const prevCoords = prevBoard?.reduce((prevCoordsRows, row, rowIndex) => {
      const result = row.reduce((prevCoordsCells, cell, columnIndex) => {
        if (cell.index && cell.index == cellIndex) {
          // console.log(cellIndex, 'cell');
          return {rowIndex, columnIndex};
        }
        return prevCoordsCells;
      }, {});
      if (result.rowIndex !== undefined || result.columnIndex !== undefined) {
        return result;
      }
      return prevCoordsRows;
    }, {});
    setPreviousCoords(prevCoords);
  }, []);

  useEffect(() => {
    if (
      (coords?.rowIndex !== undefined || coords?.columnIndex !== undefined) &&
      (previousCoords?.rowIndex !== undefined ||
        previousCoords?.columnIndex !== undefined)
    ) {
      const yDistance = coords.rowIndex - previousCoords.rowIndex;
      const xDistance = coords.columnIndex - previousCoords.columnIndex;
      // console.log(xDistance, coords.rowIndex, previousCoords.rowIndex);
      if (yDistance || xDistance) {
        translateY.value = withTiming(0);

        // console.log(yDistance, xDistance);
      }
    }
  }, [previousCoords]);

  const vanish = () => {
    const newBoard = JSON.parse(JSON.stringify(currBoard));
    newBoard[coords.rowIndex][coords.columnIndex] = {index: null, value: 0};
    setBoard(newBoard);
    handleAddVanishedStepToHistory(history, newBoard, historyRef, setHistory);
  };

  const handleLongPress = (board, value) => {
    value > 0 && vanish();
    // : (() => {
    //     const newBoard = addRandomTile(board, setBoard, counter);
    //     handleAddVanishedStepToHistory(
    //       history,
    //       newBoard,
    //       historyRef,
    //       setHistory,
    //     );
    //   })();
  };

  return (
    <Animated.View
      entering={cellIndex == counter && ZoomIn.delay(100)}
      style={[styles.cell, {backgroundColor}, animatedStyle]}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: '100%',
        }}
        onLongPress={() => handleLongPress(currBoard, value)}>
        <TextElement
          changeFontByRem={-0.1}
          customStyle={{
            ...styles.cellText,
            color: textColor ? textColor : '#000000',
          }}>
          {displayOnlyBoard ? (focusOnTheme ? '' : value) : value}
        </TextElement>
      </Pressable>
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
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
});

export default Tile;
