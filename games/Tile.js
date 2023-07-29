import EStyleSheet from 'react-native-extended-stylesheet';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {TextElement} from '../components/Reusable/TextElement';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Tile = ({
  value,
  backgroundColor,
  textColor,
  displayOnlyBoard,
  cellIndex,
  coords,
  counter,
  focusOnTheme,
}) => {
  return (
    <Animated.View
      entering={cellIndex == counter && ZoomIn.delay(100)}
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
