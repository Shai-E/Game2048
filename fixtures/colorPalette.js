import Config from 'react-native-config';
import store from '../store/store';

const BRAND = Config.BRAND;

export const colorPalette = {
  Psy: {
    dark: {
      fillPrimary: '#1c2541',
      fillSecondary: '#3a506b',
      strokePrimary: '#d8f3dc',
      strokeSecondary: '#081c15',
      placeholder: '#ced4da',
      shadow: '#ced4da',
      border: '#d8f3dc',
      warning: '#ef233c',
      success: '#9ef01a',
      background: '#0b132b',
      accent: '#284b63',
      primaryText: '#d8f3dc',
      secondaryText: '#081c15',
      link: '#3498DB',
      disabled: '#95A5A6',
      overlay: '#ffd7ba',
      divider: '#ced4da',
      highlight: '#6fffe9',
      navigation: '#74c69d',
    },
    light: {
      fillPrimary: '#3498DB',
      fillSecondary: '#5DADE2',
      strokePrimary: '#E6E9ED',
      strokeSecondary: '#D4E6F1',
      placeholder: '#7F8C8D',
      shadow: '#000000',
      border: '#E6E9ED',
      warning: '#E74C3C',
      success: '#2ECC71',
      background: '#FFFFFF',
      accent: '#2980B9',
      primaryText: '#34495E',
      secondaryText: '#95A5A6',
      link: '#3498DB',
      disabled: '#95A5A6',
      overlay: '#000000',
      divider: '#E6E9ED',
      highlight: '#F39C12',
      navigation: '#34495E',
    },
  },
};

const formatPaletteForEStyleSheet = palette => {
  const formattedPalette = {};
  for (const key in palette) {
    formattedPalette[`$${key}`] = palette[key];
  }
  return formattedPalette;
};

export const paletteBuildObject = () => {
  const isDarkMode = store.getState().appSlice.isDarkMode;
  return formatPaletteForEStyleSheet(
    colorPalette[BRAND][isDarkMode ? 'dark' : 'light'],
  );
};

export default JSON.stringify(colorPalette);
