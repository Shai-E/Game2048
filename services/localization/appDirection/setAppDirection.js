import {appSupportedLanguages as languages} from '../languages';
import {getFromStorage} from '../../utils/storage/setAsyncStorage';
import * as Localize from 'react-native-localize';
// import store from '../store/store';
// import {setUserLanguage} from '../store/reducers/accountSlice';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

export const setAppDeviceLanguage = () => {
  const DEFAULT_LANG = 'en';
  const deviceLanguage =
    languages.find(
      lang => lang.code === Localize.getLocales()[0].languageCode,
    ) || languages.find(lang => lang.code === DEFAULT_LANG);
  return deviceLanguage;
};

export const determineRtl = async i18n => {
  const language = i18n.language;
  const langFromStorage = await getFromStorage('savedLanguage');
  const savedLanguage = languages.find(lang => lang.code === language);
  const defaultLanguage = setAppDeviceLanguage();
  const langObj = langFromStorage || savedLanguage || defaultLanguage;
  // store.dispatch(setUserLanguage({...langObj, translation: ''}));
  forceRestart(i18n);
};

const forceRestart = async i18n => {
  const storedLanguage = await getFromStorage('savedLanguage');
  const prevLanguage = await getFromStorage('prevLanguage');
  if (storedLanguage && prevLanguage !== storedLanguage) {
    await i18n.changeLanguage(storedLanguage);
    const savedLanguage = languages.find(lang => lang.code === storedLanguage);
    if (I18nManager.isRTL !== (savedLanguage.direction === 'rtl')) {
      await I18nManager.forceRTL(!I18nManager.isRTL);
      RNRestart.Restart();
    }
  }
};
