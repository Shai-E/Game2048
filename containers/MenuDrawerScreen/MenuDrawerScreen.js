import {ScreenContainer} from '../../components/Reusable/Containers';
import {TextElement} from '../../components/Reusable/TextElement';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setBottomBG, setTopBG} from '../../store/reducers/appSlice';
import {useColors} from '../../services/customHook/useColors';
import {TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
// import {NativeModules, Platform} from 'react-native';

export const MenuDrawerScreen = () => {
  const status = useDrawerStatus();
  const dispatch = useDispatch();
  const {background} = useColors();
  const topBackgroundColor = useSelector(
    state => state.appSlice.topBackgroundColor,
  );
  // const isDarkMode = useSelector(state => state.appSlice.isDarkMode);
  // const {ThemeModule} = NativeModules;
  const bottomBackgroundColor = useSelector(
    state => state.appSlice.bottomBackgroundColor,
  );
  const prevColors = useRef({});
  // const [hasChanged, setHasChanged] = useState();
  useEffect(() => {
    if (status === 'open') {
      prevColors.current.bottomBackgroundColor = bottomBackgroundColor;
      prevColors.current.topBackgroundColor = topBackgroundColor;
      dispatch(setBottomBG(background));
      dispatch(setTopBG(background));
      // !hasChanged &&
      //   Platform.OS === 'android' &&
      //   ThemeModule.changeTheme(isDarkMode ? 'dark-drawer' : 'light-drawer');
      // !hasChanged && setHasChanged(true);
    }
    return () => {
      dispatch(setTopBG(prevColors.current.topBackgroundColor));
      dispatch(setBottomBG(prevColors.current.bottomBackgroundColor));
      // hasChanged  && Platform.OS === 'android' &&
      //   ThemeModule.changeTheme(isDarkMode ? 'dark' : 'light');
    };
  }, [status, prevColors.current]);
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <TouchableOpacity
        style={styles.menuSection}
        onPress={() => {
          navigation.navigate('user', {screen: 'game-2048'});
        }}>
        <TextElement>2048</TextElement>
      </TouchableOpacity>
      <TextElement>drawer</TextElement>
    </ScreenContainer>
  );
};

const styles = EStyleSheet.create({
  menuSection: {
    width: wp('85%'),
    borderRadius: 100,
    borderColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1.4,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 3,
  },
});
