import {en} from './lang/en.json';
import {he} from './lang/he.json';

export const appSupportedLanguages = [
  {
    englishName: 'English',
    name: 'English',
    code: 'en',
    direction: 'ltr',
    translation: en,
    font: 'Ubuntu-Regular',
    fontBold: 'Ubuntu-Bold',
    fontMedium: 'Ubuntu-Medium',
    defaultSize: 1,
    available: true,
    brands: ['brandName1', 'brandName2'],
  },
  //   {
  //     englishName: 'Arabic',
  //     name: 'عربي',
  //     code: 'ar',
  //     direction: 'rtl',
  //     translation: ar,
  //     font: undefined,
  //     fontBold: undefined,
  //     fontMedium: undefined,
  //     defaultSize: 1,
  //     available: true,
  //     brands: ['offersfx']
  //   },
  {
    englishName: 'Hebrew',
    name: 'עברית',
    code: 'he',
    direction: 'rtl',
    translation: he,
    font: 'Assistant-Regular',
    fontBold: 'Assistant-Bold',
    fontMedium: 'Assistant-Medium',
    defaultSize: 1,
    available: true,
    brands: ['brandName1'],
  },
].sort((a, b) => a.name > b.name);

export const translations = appSupportedLanguages.reduce(
  (translationsObject, languageObject) => {
    return languageObject.available && languageObject.translation
      ? {
          ...translationsObject,
          [languageObject.code]: languageObject.translation,
        }
      : translationsObject;
  },
  {},
);

export const resources = Object.entries(translations).reduce(
  (acc, [index, item]) => {
    acc[index] = {translation: item};
    return acc;
  },
  {},
);
