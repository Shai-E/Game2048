import {setAppDeviceLanguage} from './setAppDirection';
import {getFromStorage} from '../../utils/storage/setAsyncStorage';

const ReactNative = require('react-native');

export const initAppDirection = async () => {
  const prevDirection = await getFromStorage('savedLanguage');
  const deviceLanguage = setAppDeviceLanguage();
  ReactNative.I18nManager.forceRTL(
    (prevDirection?.direction || deviceLanguage.direction) === 'rtl',
  );
};
