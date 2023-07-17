import {useSelector} from 'react-redux';
import Config from 'react-native-config';
const BRAND = Config.BRAND;
import {colorPalette} from '../../fixtures/colorPalette';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {initPalette} from '../initApp/initApp';
const themes = colorPalette[BRAND];
const {light, dark} = themes;

export const useColors = (colorName, theme) => {
  const isDarkMode = useSelector(state => state.appSlice.isDarkMode);
  if (colorName) {
    return isDarkMode ? dark[colorName] : light[colorName];
  }

  if (theme && !colorName) {
    return themes[theme];
  }
  if (theme && colorName) {
    return themes[theme][colorName];
  }

  return isDarkMode ? dark : light;
};

export const useCurrentPalette = () => {
  const isDarkMode = useSelector(state => state.appSlice.isDarkMode);
  useFocusEffect(
    useCallback(() => {
      initPalette();
    }, [isDarkMode]),
  );
};
