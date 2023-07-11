import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  I18nManager,
} from 'react-native';

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
};

const GameBoard = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const initialBoard = Array(4)
      .fill(0)
      .map(() => Array(4).fill(0));
    addRandomTile(initialBoard);
    addRandomTile(initialBoard);
    setBoard(initialBoard);
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
    let newBoard = [...board];

    switch (direction) {
      case 'down':
        newBoard = transposeBoard(newBoard);
        newBoard = moveTiles(newBoard);
        newBoard = mergeTiles(newBoard);
        newBoard = moveTiles(newBoard);
        newBoard = transposeBoard(newBoard);
        break;
      case 'up':
        newBoard = transposeBoard(newBoard);
        newBoard = reverseRows(newBoard);
        newBoard = moveTiles(newBoard);
        newBoard = mergeTiles(newBoard);
        newBoard = moveTiles(newBoard);
        newBoard = reverseRows(newBoard);
        newBoard = transposeBoard(newBoard);
        break;
      case isRtl ? 'left' : 'right':
        newBoard = moveTiles(newBoard);
        newBoard = mergeTiles(newBoard);
        newBoard = moveTiles(newBoard);
        break;
      case isRtl ? 'right' : 'left':
        newBoard = reverseRows(newBoard);
        newBoard = moveTiles(newBoard);
        newBoard = mergeTiles(newBoard);
        newBoard = moveTiles(newBoard);
        newBoard = reverseRows(newBoard);
        break;
      default:
        break;
    }

    if (!isEqual(board, newBoard)) {
      addRandomTile(newBoard);
    }

    setBoard(newBoard);
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
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        if (newBoard[i][j] === newBoard[i][j - 1]) {
          newBoard[i][j] *= 2;
          newBoard[i][j - 1] = 0;
        }
      }
    }
    return newBoard;
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
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, columnIndex) => {
          const cellValue = cell !== 0 ? cell.toString() : '';
          const backgroundColor = colors[cellValue] || colors.undefined;

          return (
            <View key={columnIndex} style={[styles.cell, {backgroundColor}]}>
              <Text style={styles.cellText}>{cellValue}</Text>
            </View>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>{renderBoard()}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSwipe('up')}>
          <Text style={styles.buttonText}>Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSwipe('left')}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSwipe('down')}>
          <Text style={styles.buttonText}>Down</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSwipe('right')}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  board: {
    borderWidth: 5,
    borderColor: '#BBADA0',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
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
});

export default GameBoard;
