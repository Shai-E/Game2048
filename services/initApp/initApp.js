import {LogBox} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {paletteBuildObject} from '../../fixtures/colorPalette';
import {initAppDirection} from '../localization/appDirection/initAppDirection';
import {getFromStorage} from '../utils/storage/setAsyncStorage';
const ReactNative = require('react-native');
const {
  NativeModules: {ThemeModule},
} = ReactNative;
import store from '../../store/store';
import {setIsDarkMode} from '../../store/reducers/appSlice';

export const initPalette = () => {
  EStyleSheet.build(paletteBuildObject());
};

export const initApp = async () => {
  LogBox.ignoreLogs([
    // 'ViewPropTypes will be removed',
    // 'ColorPropType will be removed',
    // 'Overwriting fontFamily style attribute preprocessor',
  ]);

  initPalette();
  const themeFromStorage = await getFromStorage('theme');
  console.log(themeFromStorage !== 'dark', 'from initapp');

  store.dispatch(setIsDarkMode(themeFromStorage !== 'light'));
  ReactNative.Platform.OS === 'android' &&
    themeFromStorage === 'light' &&
    ThemeModule.changeTheme(themeFromStorage);

  // initAppDirection();
};
