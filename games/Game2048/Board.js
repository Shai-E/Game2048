import {View} from 'react-native';
import Tile from './Tile';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {memo} from 'react';

const Board = ({
  board,
  colors,
  counter,
  focusOnTheme,
  displayOnlyBoard,
  prevBoard,
  setBoard,
  historyRef,
  setHistory,
  history,
}) => {
  return (
    <>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, columnIndex) => {
            const cellValue =
              cell.value > 0
                ? cell.value?.toString()
                : cell > 0
                ? cell.toString()
                : '';
            const cellIndex = cell.index !== null ? cell.index?.toString() : '';
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
                counter={counter}
                focusOnTheme={focusOnTheme}
                displayOnlyBoard={displayOnlyBoard}
                prevBoard={prevBoard?.board}
                currBoard={board}
                setBoard={setBoard}
                historyRef={historyRef}
                setHistory={setHistory}
                history={history}
              />
            );
          })}
        </View>
      ))}
    </>
  );
};

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default memo(Board);
