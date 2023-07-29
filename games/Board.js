import {View} from 'react-native';
import Tile from './Tile';
import EStyleSheet from 'react-native-extended-stylesheet';

const Board = ({board, colors, counter, focusOnTheme, displayOnlyBoard}) => {
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

export default Board;
