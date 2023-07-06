import i18n from 'i18next';
import {I18nManager} from 'react-native';
import {appSupportedLanguages} from '../../localization/languages';

export const defineFont = (fontWeight, changeFontByRem) => {
  const language = i18n.language;
  const isRtl = I18nManager.getConstants().isRTL;

  const userLanguage = appSupportedLanguages.find(
    lang => lang.code === language,
  );

  const defaultFont = 'Ubuntu-Regular';

  const fontsWeights = {
    bold: userLanguage?.fontBold,
    medium: userLanguage?.fontMedium,
    normal: userLanguage?.font,
  };

  const fontFamily = fontsWeights[fontWeight || 'normal'] || defaultFont;

  const fontSize = `${
    (userLanguage?.defaultSize || 1) + (changeFontByRem || 0)
  }rem`;

  return {isRtl, fontFamily, fontSize};
};
