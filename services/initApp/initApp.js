import {LogBox} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {paletteBuildObject} from '../../fixtures/colorPalette';
import {initAppDirection} from '../localization/appDirection/initAppDirection';

export const initApp = () => {
  LogBox.ignoreLogs([
    // 'ViewPropTypes will be removed',
    // 'ColorPropType will be removed',
    // 'Overwriting fontFamily style attribute preprocessor',
  ]);

  EStyleSheet.build(paletteBuildObject);

  initAppDirection();
};
