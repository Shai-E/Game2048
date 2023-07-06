import {useSelector} from 'react-redux';
import Config from 'react-native-config';
const BRAND = Config.BRAND;
import colorPalette from '../../fixtures/colorPalette';
const themes = colorPalette[BRAND];
const {light, dark} = themes;

export const useColors = (colorName, theme) => {
  const isDarkMode = true; /* useSelector((state) => state.accountSlice.isDarkMode) */
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
