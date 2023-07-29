import EStyleSheet from 'react-native-extended-stylesheet';
import {ButtonElement} from '../components/Reusable/ButtonElement';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const GameButton = ({onPress, title, customStyle}) => {
  return (
    <ButtonElement
      preventDefaultStyle
      customStyle={{
        ...styles.gameButton,
        ...styles.gameButtonText,
        color: EStyleSheet.value('$primaryText'),
        ...customStyle,
      }}
      onPress={onPress}
      title={title}
    />
  );
};

const styles = EStyleSheet.create({
  gameButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    justifyContent: 'center',
    height: heightPercentageToDP('4%'),
    backgroundColor: '$fillPrimary',
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  gameButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameButton;
